import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  await seedUsers();
  await seedAuthors();
  await seedGenres();
  await seedBooks();
  console.log('Seeding done. You can now start the server.');
}

async function seedUsers() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    const users = [];
    for (let i = 0; i < 20; i++) {
      const firstName = faker.unique(faker.name.firstName);
      const lastName = faker.unique(faker.name.lastName);
      const email = faker.internet.email(firstName, lastName, 'yopmail.com');
      const username = `${firstName}_${lastName}`;
      users.push({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        role: 'USER',
        isActive: true,
        isEmailVerified: true,
      });
    }
    await Promise.all(
      users.map(async userData =>
        prisma.user.create({
          data: {
            ...userData,
            password: await hash(userData.username, 10),
          },
        }),
      ),
    );
  }
  console.log('Seeding users done!');
}

async function seedAuthors() {
  const authors = await prisma.author.findMany();
  if (authors.length === 0) {
    const authors = [];
    for (let i = 0; i < 20; i++) {
      const firstName = faker.helpers.unique(faker.name.firstName);
      const lastName = faker.helpers.unique(faker.name.lastName);
      const fullName = `${firstName} ${lastName}`;
      authors.push({
        firstName,
        lastName,
        fullName,
      });
    }
    await Promise.all(
      authors.map(async authorData =>
        prisma.author.create({
          data: {
            ...authorData,
          },
        }),
      ),
    );
  }
  console.log('Seeding authors done!');
}

async function seedGenres() {
  const genres = await prisma.genre.findMany();
  if (genres.length === 0) {
    const genres = [
      'Fantasy',
      'Romance',
      'Horror',
      'Thriller',
      'Mystery',
      'Science Fiction',
      'Drama',
      'Poetry',
      'Biography',
      'Autobiography',
      'History',
      'Guide',
      'Travel',
      'Children',
      'Religion',
      'Science',
      'Math',
      'Anthology',
      'Encyclopedia',
      'Dictionary',
      'Comics',
      'Art',
      'Cookbook',
      'Diary',
      'Journals',
      'Prayer',
      'Series',
      'Trilogy',
    ];
    await prisma.genre.createMany({
      data: genres.map(genre => ({ name: genre })),
    });
  }
  console.log('Seeding genres done!');
}

async function seedBooks() {
  const books = await prisma.book.findMany();
  const authorsData = await prisma.author.findMany();
  const users = await (await prisma.user.findMany({})).slice(3, 15);
  const genresData = await prisma.genre.findMany();
  if (books.length === 0) {
    const books = [];
    for (let i = 0; i < 20; i++) {
      const title = faker.unique(faker.lorem.words);
      const description = faker.lorem.paragraphs();
      const authors = [authorsData[Math.floor(Math.random() * authorsData.length)]];
      const genres = [genresData[Math.floor(Math.random() * genresData.length)]];
      const publicationYear = faker.datatype.number({ min: 1900, max: 2021 });
      const price = faker.datatype.number({ min: 1, max: 100 });
      const coverImage = faker.image.imageUrl();
      const color = faker.internet.color();

      const language = [
        'French',
        'English',
        'Spanish',
        'German',
        'Italian',
        'Portuguese',
        'Russian',
        'Chinese',
        'Japanese',
        'Korean',
      ];
      books.push({
        title,
        publicationYear,
        coverImage,
        language: language[Math.floor(Math.random() * language.length)],
        color,
        description,
        price,
        verified: true,
        userId: users[Math.floor(Math.random() * users.length)].id,
        authors: {
          connect: authors.map(author => ({ id: author.id })),
        },
        genres: {
          connect: genres.map(genre => ({ id: genre.id })),
        },
      });
    }
    await Promise.all(books.map(async bookData => prisma.book.create({ data: { ...bookData } })));
  }

  console.log('Seeding books done!');
}

main()
  .catch(e => {
    console.error(e, '<== error');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
