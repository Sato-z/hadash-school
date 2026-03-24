# Hadash School Management System

A comprehensive school management system built with React and Vite, designed to streamline administrative tasks and improve educational workflow management.

## Features

- **Student Management**: Add, edit, and manage student records with comprehensive information tracking
- **Timetable Scheduling**: Create and manage class schedules with an intuitive interface
- **Results Tracking**: Record and monitor student academic performance
- **Admin Dashboard**: Overview of school statistics and quick access to all modules
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth transitions and interactions

## Technology Stack

- **Frontend**: React 18 with Vite for fast development
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for modern iconography
- **State Management**: React Query for server state management
- **Routing**: React Router DOM for navigation
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hadash-school
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── students/       # Student-related components
│   ├── results/        # Results management components
│   └── ui/             # Base UI components
├── pages/              # Page components
├── services/           # API service functions
├── lib/                # Utility libraries
└── utils/              # Helper functions
```

## Usage

This system is designed for educational institutions to manage their daily operations efficiently. The admin interface provides tools for:

- Managing student enrollment and records
- Creating and maintaining class timetables
- Tracking and reporting student results
- Monitoring overall school performance through dashboards

## Contributing

This project is open for educational purposes. Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License.

---

**Note**: This is a demonstration project intended for educational purposes. For production use, additional security measures and backend integration would be required.
