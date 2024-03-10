import express from 'express';
import Artist from '../models/Artist';
import mongoose, { Types } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import { ArtistMutation } from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(artist);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const artistData: ArtistMutation = {
        title: req.body.title,
        information: req.body.description,
        image: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);
      await artist.save();

      res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

artistsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      let image: string | undefined | null = undefined;

      if (req.body.image === 'delete') {
        image = null;
      } else if (req.file) {
        image = req.file.filename;
      }

      const artist = await Artist.findById(req.params.id);
      if (!artist) {
        return res.status(404).send({ message: 'Not found!' });
      }

      const result = await Artist.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            information: req.body.description,
            isPublished: !artist.isPublished,
            image,
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: 'Not found!' });
      }

      return res.send({
        message: 'Ok. Publication status toggled successfully.',
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  },
);

artistsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const { id } = req.params;

      const artist = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send({ error: 'Not found!' });
      }

      if (
        artist.isPublished ||
        (req.user?.role !== 'admin' &&
          artist.user.toString() !== req.user?._id.toString())
      ) {
        return res
          .status(403)
          .send({ error: 'You do not have permission to delete this artist.' });
      }

      await artist.deleteOne();

      res.status(204).send({ message: 'Artist successfully deleted.' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({ error: 'Invalid artist ID format!' });
      }
      next(e);
    }
  },
);

export default artistsRouter;
