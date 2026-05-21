# Bug Tracker App

A polished, feature-rich bug tracking web application built with React and Tailwind CSS.

## Features

### Core Functionality
- **Bug List View**: Display bugs with title, description, priority, and status
- **Add New Bugs**: Form to create new bug reports with validation
- **Status Filtering**: Filter bugs by All, Open, In Progress, or Fixed
- **Visual Badges**: Color-coded pills for priority and status
- **Dark Mode**: Full dark theme with localStorage persistence
- **Statistics**: Real-time counts for each status
- **Sample Data**: 8 pre-populated realistic bug examples

### Priority Levels
- **Low**: Gray badge
- **Medium**: Blue badge
- **High**: Orange badge
- **Critical**: Red badge

### Status Types
- **Open**: Blue badge
- **In Progress**: Yellow badge
- **Fixed**: Green badge

## Technologies

- **React**: Functional components with hooks (useState, useEffect)
- **Tailwind CSS**: Utility-first CSS framework with dark mode
- **Create React App**: Project scaffolding and build tools
- **LocalStorage API**: Theme persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
bug-tracker/
├── public/          # Static files
├── src/
│   ├── App.js       # Main bug tracker component with all features
│   ├── index.js     # Entry point
│   └── index.css    # Tailwind directives
├── tailwind.config.js  # Tailwind with dark mode enabled
├── postcss.config.js
└── package.json
```

## Usage

### Viewing Bugs
- All bugs displayed in a responsive card grid
- Each card shows title, description, priority badge, and status badge
- Hover effects on cards

### Filtering Bugs
- Click filter buttons: All, Open, In Progress, or Fixed
- Active filter highlighted in blue
- Bug list updates instantly
- Statistics cards show counts

### Adding Bugs
1. Click "+ Add Bug" button
2. Fill in title and description (required)
3. Select priority and status
4. Click "Submit Bug Report"
5. New bug appears at the top of the list

### Dark Mode
- Click sun/moon icon in header to toggle
- Theme preference saved automatically
- Persists across browser sessions
- All UI elements adapt to theme

## UI Features

### Light Theme
- Background: gray-50
- Cards: white with gray-200 borders
- Text: gray-900
- Badges: Colored backgrounds with dark text

### Dark Theme
- Background: gray-900
- Cards: gray-800 with gray-700 borders
- Text: white
- Badges: Darker colored backgrounds with lighter text

### Responsive Design
- Mobile: 1 column grid
- Tablet: 2 columns
- Desktop: 3 columns
- Filter buttons wrap on small screens

### Accessibility
- Visible focus rings on all interactive elements
- ARIA labels on icon buttons
- Keyboard navigation support
- High contrast in both themes

## Components

- **App**: Main component with state management
- **PriorityBadge**: Reusable priority indicator
- **StatusBadge**: Reusable status indicator
- **DarkModeToggle**: Theme switcher with icons
- **FilterButtons**: Status filter controls

## Sample Data

The app includes 8 pre-populated bugs demonstrating:
- All priority levels (Low, Medium, High, Critical)
- All status states (Open, In Progress, Fixed)
- Realistic bug descriptions
- Real-world development scenarios

## Documentation

- [ENHANCEMENTS.md](./ENHANCEMENTS.md) - Detailed enhancement documentation
- [TESTING.md](./TESTING.md) - Feature testing guide
- [VERIFICATION.md](./VERIFICATION.md) - Complete verification checklist

## License

MIT
