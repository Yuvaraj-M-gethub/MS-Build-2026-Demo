# Bug Tracker App

A simple but polished bug tracking web application built with React and Tailwind CSS.

## Features

- **Bug List View**: Display bugs with title, description, priority, and status
- **Add New Bugs**: Form to create new bug reports with validation
- **Sample Data**: Pre-populated with 6 realistic bug examples
- **Responsive Design**: Clean, modern UI that works on all screen sizes
- **Status Types**: Open, In Progress, Fixed
- **Priority Levels**: Low, Medium, High

## Technologies

- **React**: Functional components with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Create React App**: Project scaffolding and build tools

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
│   ├── App.js       # Main bug tracker component
│   ├── index.js     # Entry point
│   └── index.css    # Tailwind directives
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Usage

1. **View Bugs**: See all bugs displayed in a card grid
2. **Add Bug**: Click "+ Add Bug" button to open the form
3. **Fill Details**: Enter title, description, priority, and status
4. **Submit**: Click "Submit Bug Report" to add the bug

## UI Features

- Centered content area with max-width
- Elevated card surfaces with shadows
- Hover effects on interactive elements
- Smooth transitions and animations
- Responsive grid layout (1-3 columns)
- Form validation
- Focus states for accessibility

## Sample Data

The app includes 6 pre-populated bugs demonstrating:
- Different priority levels (Low, Medium, High)
- Various status states (Open, In Progress, Fixed)
- Realistic bug descriptions
- Real-world scenarios

## License

MIT
