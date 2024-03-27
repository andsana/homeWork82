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

  const collections = ['track-history', 'users', 'tracks', 'albums', 'artists'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [user, _admin] = await User.create(
    {
      email: 'user@shop.local',
      displayName: 'user',
      password: '123456',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      email: 'admin@shop.local',
      displayName: 'admin',
      password: '123456',
      token: crypto.randomUUID(),
      role: 'admin',
    },
  );

  const [nirvana, linkinPark, scorpions] = await Artist.create(
    {
      title: 'Nirvana',
      image: 'fixtures/nirvana.jpg',
      information: 'Rock',
      isPublished: true,
      user: user._id,
    },
    {
      title: 'Linkin Park',
      image: 'fixtures/linkin-park.jpg',
      information: 'Rock',
      isPublished: true,
      user: user._id,
    },
    {
      title: 'Scorpions',
      image: 'fixtures/scorpions.jpg',
      information: 'Rock',
      isPublished: false,
      user: user._id,
    },
  );

  const [nevermind, inUtero, meteora, hybridTheory, loveAtFirstSting] =
    await Album.create(
      {
        artist: nirvana,
        title: 'Nevermind',
        releaseYear: 1991,
        image: 'fixtures/nevermind.jpg',
        isPublished: true,
        user: user._id,
      },
      {
        artist: nirvana,
        title: 'In Utero',
        releaseYear: 1993,
        image: 'fixtures/in-utero.jpg',
        isPublished: true,
        user: user._id,
      },
      {
        artist: linkinPark,
        title: 'Meteora',
        releaseYear: 2007,
        image: 'fixtures/meteora.jpg',
        isPublished: true,
        user: user._id,
      },
      {
        artist: linkinPark,
        title: 'Hybrid Theory',
        releaseYear: 2000,
        image: 'fixtures/hybrid-theory.jpg',
        isPublished: true,
        user: user._id,
      },
      {
        artist: scorpions,
        title: 'Love at First Sting',
        releaseYear: 1984,
        image: 'fixtures/albumScorp.jpg',
        isPublished: false,
        user: user._id,
      },
    );

  const tracks = await Track.create([
    {
      album: nevermind,
      number: 1,
      title: 'Smells Like Teen Spirit',
      duration: '5:01',
      link: 'https://www.youtube.com/watch?v=hTWKbfoikeg',
      isPublished: true,
      user: user._id,
    },
    {
      album: nevermind,
      number: 2,
      title: 'In Bloom',
      duration: '4:14',
      isPublished: true,
      user: user._id,
    },
    {
      album: nevermind,
      number: 3,
      title: 'Come as You Are',
      duration: '3:38',
      isPublished: true,
      user: user._id,
    },
    {
      album: nevermind,
      number: 4,
      title: 'Breed',
      duration: '3:03',
      isPublished: true,
      user: user._id,
    },
    {
      album: nevermind,
      number: 5,
      title: 'Lithium',
      duration: '4:16',
      isPublished: true,
      user: user._id,
    },
    {
      album: inUtero,
      number: 1,
      title: 'Serve the Servants',
      duration: '3:36',
      isPublished: true,
      user: user._id,
    },
    {
      album: inUtero,
      number: 2,
      title: 'Scentless Apprentice',
      duration: '3:48',
      isPublished: true,
      user: user._id,
    },
    {
      album: inUtero,
      number: 3,
      title: 'Heart-Shaped Box',
      duration: '4:41',
      isPublished: true,
      user: user._id,
    },
    {
      album: inUtero,
      number: 4,
      title: 'Rape Me',
      duration: '2:50',
      isPublished: true,
      user: user._id,
    },
    {
      album: inUtero,
      number: 5,
      title: 'Frances Farmer Will Have Her Revenge on Seattle',
      duration: '4:09',
      isPublished: true,
      user: user._id,
    },
    {
      album: meteora,
      number: 1,
      title: "Don't Stay",
      duration: '3:16',
      isPublished: true,
      user: user._id,
    },
    {
      album: meteora,
      number: 2,
      title: 'Somewhere I Belong',
      duration: '4:09',
      isPublished: true,
      user: user._id,
    },
    {
      album: meteora,
      number: 3,
      title: 'Lying from You',
      duration: '2:57',
      isPublished: true,
      user: user._id,
    },
    {
      album: meteora,
      number: 4,
      title: 'Faint',
      duration: '3:41',
      isPublished: true,
      user: user._id,
    },
    {
      album: meteora,
      number: 5,
      title: 'Breaking the Habit',
      duration: '4:15',
      isPublished: true,
      user: user._id,
    },
    {
      album: hybridTheory,
      number: 1,
      title: 'Papercut',
      duration: '3:04',
      isPublished: true,
      user: user._id,
    },
    {
      album: hybridTheory,
      number: 2,
      title: 'One Step Closer',
      duration: '2:35',
      isPublished: true,
      user: user._id,
    },
    {
      album: hybridTheory,
      number: 3,
      title: 'With You',
      duration: '3:23',
      isPublished: true,
      user: user._id,
    },
    {
      album: hybridTheory,
      number: 4,
      title: 'Points of Authority',
      duration: '3:20',
      isPublished: true,
      user: user._id,
    },
    {
      album: hybridTheory,
      number: 5,
      title: 'Crawling',
      duration: '3:29',
      isPublished: true,
      user: user._id,
    },
    {
      album: loveAtFirstSting,
      number: 1,
      title: 'Still Loving You',
      duration: '6:26',
      isPublished: false,
      user: user._id,
    },
    {
      album: loveAtFirstSting,
      number: 2,
      title: 'Big City Nights',
      duration: '4:08',
      isPublished: false,
      user: user._id,
    },
    {
      album: loveAtFirstSting,
      number: 3,
      title: 'As Soon as the Good Times Roll',
      duration: '5:01',
      isPublished: false,
      user: user._id,
    },
  ]);

  await TrackHistory.create({
    track: tracks[0],
    user: user._id,
  });

  await db.close();
};

void run();
