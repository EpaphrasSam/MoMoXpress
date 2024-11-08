# MoMoXpress 💸

MoMoXpress is a modern web application that helps users calculate mobile money (MoMo) transfer charges across different telecommunications networks in Ghana. Built with Next.js and TypeScript, it provides instant, accurate calculations while offering a seamless user experience.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://momoxpress.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)

## ✨ Features

- **Real-time Fee Calculation**: Instantly calculate transfer fees for any amount
- **Cross-Network Support**: Calculate fees across different mobile money providers
- **E-Levy Integration**: Automatically includes E-levy calculations
- **Responsive Design**: Seamless experience across all devices
- **Network-Specific Validation**: Smart validation for telco-specific phone numbers
- **Modern UI**: Built with NextUI components and smooth animations
- **Newsletter Subscription**: Stay updated with the latest features and fee changes via SMS
- **Phone Number Validation**: Automatic validation of Ghanaian phone numbers by network

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [NextUI v2](https://nextui.org/)
- **Form Validation**:
  - [Zod](https://zod.dev/) for schema validation
  - Custom phone number validation
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Fonts**: Geist Font Family
- **Development Tools**:
  - ESLint
  - Prettier
  - PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/EpaphrasSam/momoxpress.git
```

2. Install dependencies:

```bash
cd momoxpress
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/
│   ├── layout/         # Layout components (Navbar, etc.)
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   ├── modal/          # Modal components (Newsletter, Results)
│   └── fallback/       # Error/loading states
├── services/           # API services
├── helpers/            # Helper functions
├── schemas/            # Validation Schemas
├── utils/              # Utility functions
└── types/             # TypeScript types
```

## 🧮 Fee Calculation Logic

The application implements the following fee structure:

### MTN Mobile Money

- Same network:
  - Free for amounts ≤ 100 GHS
  - 0.75% for amounts > 100 GHS
- Cross-network: Flat 0.75% of amount

### AirtelTigo/Telecel Money

- Same network: Free
- Cross-network:
  - Free for amounts ≤ 100 GHS
  - 0.5% for amounts > 100 GHS

### E-Levy

- 1% for amounts > 100 GHS
- Exempt for amounts ≤ 100 GHS

## 📨 Newsletter Subscription

Stay updated with:

- Latest mobile money fee changes
- New features and updates
- Service disruption notifications
- Tips for saving on transaction fees

To subscribe:

1. Click on the Newsletter button
2. Enter your phone number
3. Subscribe to newsletter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👏 Acknowledgments

- [NextUI](https://nextui.org/) for the amazing component library
- Ghana telco providers for their fee structure information
- [Vercel](https://vercel.com) for hosting the application

## 📞 Contact

For any questions or suggestions, please open an issue in the GitHub repository or contact the maintainers:

- Email - isinesam@gmail.com

---

Built with ❤️ for the Ghanaian mobile money community
