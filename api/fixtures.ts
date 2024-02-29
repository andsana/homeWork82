import mongoose from 'mongoose';
import config from './config';
import crypto from 'crypto';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import TrackHistory from './models/TrackHistory';
import User from './models/User';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const models = [TrackHistory, User, Track, Album, Artist];

  for (const model of models) {
    await dropCollection(db, model.collection.collectionName);
  }

  const [nirvana, linkinPark] = await Artist.create(
    {
      title: 'Nirvana',
      image: 'fixtures/nirvana.jpg',
      information: 'Rock',
    },
    {
      title: 'Linkin Park',
      image: 'fixtures/linkin-park.jpg',
      information: 'Rock',
    },
  );

  const [nevermind, inUtero, meteora, hybridTheory] = await Album.create(
    {
      artist: nirvana,
      title: 'Nevermind',
      releaseYear: 1991,
      image: 'fixtures/nevermind.jpg',
    },
    {
      artist: nirvana,
      title: 'In Utero',
      releaseYear: 1993,
      image: 'fixtures/in-utero.jpg',
    },
    {
      artist: linkinPark,
      title: 'Meteora',
      releaseYear: 2007,
      image: 'fixtures/meteora.jpg',
    },
    {
      artist: linkinPark,
      title: 'Hybrid Theory',
      releaseYear: 2000,
      image: 'fixtures/hybrid-theory.jpg',
    },
  );

  const tracks = await Track.create([
    {
      album: nevermind,
      number: 1,
      title: 'Smells Like Teen Spirit',
      duration: '5:01',
    },
    {
      album: nevermind,
      number: 2,
      title: 'In Bloom',
      duration: '4:14',
    },
    {
      album: nevermind,
      number: 3,
      title: 'Come as You Are',
      duration: '3:38',
    },
    {
      album: nevermind,
      number: 4,
      title: 'Breed',
      duration: '3:03',
    },
    {
      album: nevermind,
      number: 5,
      title: 'Lithium',
      duration: '4:16',
    },
    {
      album: inUtero,
      number: 1,
      title: 'Serve the Servants',
      duration: '3:36',
    },
    {
      album: inUtero,
      number: 2,
      title: 'Scentless Apprentice',
      duration: '3:48',
    },
    {
      album: inUtero,
      number: 3,
      title: 'Heart-Shaped Box',
      duration: '4:41',
    },
    {
      album: inUtero,
      number: 4,
      title: 'Rape Me',
      duration: '2:50',
    },
    {
      album: inUtero,
      number: 5,
      title: 'Frances Farmer Will Have Her Revenge on Seattle',
      duration: '4:09',
    },
    {
      album: meteora,
      number: 1,
      title: "Don't Stay",
      duration: '3:16',
    },
    {
      album: meteora,
      number: 2,
      title: 'Somewhere I Belong',
      duration: '4:09',
    },
    {
      album: meteora,
      number: 3,
      title: 'Lying from You',
      duration: '2:57',
    },
    {
      album: meteora,
      number: 4,
      title: 'Faint',
      duration: '3:41',
    },
    {
      album: meteora,
      number: 5,
      title: 'Breaking the Habit',
      duration: '4:15',
    },
    {
      album: hybridTheory,
      number: 1,
      title: 'Papercut',
      duration: '3:04',
    },
    {
      album: hybridTheory,
      number: 2,
      title: 'One Step Closer',
      duration: '2:35',
    },
    {
      album: hybridTheory,
      number: 3,
      title: 'With You',
      duration: '3:23',
    },
    {
      album: hybridTheory,
      number: 4,
      title: 'Points of Authority',
      duration: '3:20',
    },
    {
      album: hybridTheory,
      number: 5,
      title: 'Crawling',
      duration: '3:29',
    },
  ]);

  const user = await User.create({
    username: 'user',
    password: '123456',
    token: crypto.randomUUID(),
  });

  await TrackHistory.create({
    user: user,
    track: tracks[0],
  });

  await db.close();
};

void run();
