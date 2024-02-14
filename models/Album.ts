import {model, Schema, Types} from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new Schema({
  artist: { //Мангус сам не проверяет, что такая артист существует в базе, поэтому нужна проверка
    type: Schema.Types.ObjectId,
    ref: 'Artist', //Это поле указывает на модель Artist
    required: true, // Artist обязательна у наших товаров
    validate: { //проверка. Мангус позволяет настраивать свою валидацию. Мы указывааем, что для поля "сategory" должен быть такой валидатор
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value); //должны найти категорию
        /*        if (artist) {
                  return true;
                }
                return false;*/

        return Boolean(artist); //это тоже самое что !!artist
      },
      message: 'Artist does not exist!' // сообщение - если валидация не прошла
    }
  },
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  image: String,
});

const Album = model('Album', AlbumSchema); // товар это мангус Model

export default Album;