# Development Prompt: Hadash School Management System

## Complete Project Recreation Prompt

**Use this prompt to recreate the Hadash School Management System with the same features, design, and functionality.**

---

### Primary Prompt

```
Create a comprehensive school management system for a Ghanaian junior high school using React + Vite. This should be a full-featured admin dashboard with the following specifications:

## Project Requirements

### Technology Stack
- React 18 with Vite
- Tailwind CSS for styling
- Radix UI components for dialogs, labels, selects
- React Router DOM for navigation
- React Query for state management
- Recharts for data visualization
- Lucide React for icons

### Core Features
1. **Admin Dashboard** - Overview with statistics cards
2. **Student Management** - CRUD operations for student records
3. **Timetable Management** - Class scheduling system
4. **Results Management** - Academic performance tracking
5. **Student Portal** - View-only interface for students
6. **Login System** - Admin and student authentication

### Ghanaian Educational Context
- Junior High School system (JHS 1-3)
- BECE preparation focus
- Ghanaian subjects: Mathematics, English, Integrated Science, Social Studies, ICT, French, RME, Creative Arts, Ghanaian Language
- Ghanaian locations and naming conventions
- School domain: @hadash.edu.gh

### Design Requirements
- Modern, clean interface with green color scheme (#1B5E20)
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Professional admin sidebar navigation
- Card-based layouts with rounded corners (2xl)
- Consistent spacing and typography

### Data Structure

#### Student Model
```javascript
{
  id: string,
  admission_number: string,
  full_name: string,
  class_level: string,
  gender: string,
  date_of_birth: string,
  parent_phone: string,
  address: string,
  pin: string,
  created_date: string
}
```

#### Timetable Model
```javascript
{
  id: string,
  class_level: string,
  day: string,
  period: number,
  time_slot: string,
  subject: string,
  teacher: string
}
```

#### Results Model
```javascript
{
  id: string,
  student_id: string,
  term: string,
  academic_year: string,
  class_level: string,
  english: number,
  mathematics: number,
  integrated_science: number,
  social_studies: number,
  ict: number,
  french: number,
  rme: number,
  creative_arts: number,
  ghanaian_language: number,
  total_score: number,
  average_score: number,
  position: number,
  remarks: string,
  created_date: string
}
```

### Authentication
- Admin login: admin@hadash.edu.gh / admin123
- Student login: Student ID + PIN
- Session storage for user persistence

### Mock Data Requirements
- 8 realistic student records with Ghanaian names and locations
- Complete timetable for JHS 1-3 with proper scheduling
- Sample results for students with realistic scores
- All data should use Ghanaian context (phone numbers, locations, names)

### File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   └── AdminSidebar.jsx
│   ├── students/
│   │   └── StudentFormDialog.jsx
│   ├── results/
│   │   └── ResultFormDialog.jsx
│   ├── shared/
│   │   ├── PageHeader.jsx
│   │   ├── StatCard.jsx
│   │   └── GradeHelper.js
│   └── ui/
│       ├── button.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── dialog.jsx
│       ├── alert-dialog.jsx
│       ├── select.jsx
│       ├── textarea.jsx
│       └── badge.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Students.jsx
│   ├── Timetable.jsx
│   ├── Results.jsx
│   ├── StudentPortal.jsx
│   ├── SchoolLogin.jsx
│   └── PageNotFound.jsx
├── services/
│   ├── studentService.js
│   ├── timetableService.js
│   └── resultService.js
├── lib/
│   ├── queryClient.js
│   └── utils.js
└── utils/
    └── index.js
```

### Implementation Notes
- Use localStorage for data persistence
- Implement proper form validation
- Add loading states and error handling
- Include search and filter functionality
- Create responsive charts for student performance
- Add proper navigation with active state indicators
- Include hover states and micro-interactions
- Use proper semantic HTML5 elements

### Admin Features
- View all students with search/filter
- Add/edit/delete students
- View class timetables
- Add/edit student results
- Dashboard with statistics (total students, average performance, etc.)

### Student Portal Features
- View personal information
- Check academic results
- View performance charts
- See class timetable

### Styling Guidelines
- Primary color: #1B5E20 (green)
- Use Tailwind CSS classes extensively
- Rounded corners: rounded-2xl for cards
- Consistent spacing: p-6, p-8 for containers
- Shadow effects: shadow-sm, shadow-md
- Hover effects on interactive elements
- Smooth transitions: transition-all duration-300

### Testing Requirements
- All CRUD operations should work
- Navigation should be functional
- Forms should have proper validation
- Responsive design should work on mobile
- Charts should display data correctly
- Login/logout functionality should work

Please implement this as a complete, production-ready application with attention to detail, proper error handling, and a professional user interface suitable for a school environment.
```

---

## Additional Implementation Tips

### Development Process
1. Start with the basic Vite + React setup
2. Install all dependencies first
3. Create the UI component library
4. Build the layout and navigation
5. Implement services with mock data
6. Create each page component
7. Add routing and authentication
8. Style and polish the interface

### Key Implementation Details
- Use `sessionStorage` for user authentication persistence
- Implement proper form validation with error messages
- Add loading states for async operations
- Use `uuid` for generating unique IDs
- Create reusable UI components following Radix UI patterns
- Implement proper error boundaries and error handling

### Mock Data Generation
Create realistic Ghanaian student data with:
- Proper Ghanaian names (Kofi, Ama, Kwame, etc.)
- Ghanaian phone numbers (starting with 024, 025, etc.)
- Ghanaian cities (Accra, Kumasi, Takoradi, etc.)
- Realistic academic scores and remarks

This prompt should result in a nearly identical application to the current Hadash School Management System.
