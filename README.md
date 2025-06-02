# LinkedIn Clone

A modern LinkedIn clone built with Next.js 14, TypeScript, Tailwind CSS, and Clerk Authentication, inspired by Sonny Sangha's course project but significantly modified to work with newer dependencies and implement additional features.

## About This Project

This project was initially based on Sonny Sangha's LinkedIn clone tutorial but has been extensively modified to:
- Update dependencies to work with Next.js 14 and latest packages
- Fix compatibility issues with newer versions
- Implement proper TypeScript types
- Add robust error handling
- Enhance the authentication flow
- Improve the commenting system
- Add real-time updates
- Implement proper MongoDB integration with Mongoose

## Features

- 🔐 Authentication with Clerk
- 📝 Create, read, update, and delete posts
- 💬 Comment on posts
- ❤️ Like/unlike posts
- 🖼️ Image upload with Cloudinary
- 👤 User profiles
- 🎨 Responsive UI with Tailwind CSS
- ⚡ Server-side rendering with Next.js
- 🗄️ MongoDB database integration

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Clerk](https://clerk.dev/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Radix UI](https://www.radix-ui.com/) - UI components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# MongoDB
MONGODB_URI=your_mongodb_uri

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
linkedin-clone/
├── src/
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...          
│   └── lib/              # Utility functions
├── mongodb/              # MongoDB models and connection
├── actions/             # Server actions
├── types/              # TypeScript types
└── public/             # Static assets
```

## Features in Detail

### Authentication
- User signup/signin with Clerk
- Protected routes and API endpoints
- User profile management

### Posts
- Create new posts with text and images
- Like/unlike posts
- Comment on posts
- Delete own posts
- Real-time updates

### UI Components
- Responsive design
- Loading states
- Error handling
- Toast notifications
- Avatar components

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Sonny Sangha's LinkedIn Clone Tutorial](https://youtube.com/@sonnysangha) - Initial inspiration and base project
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)