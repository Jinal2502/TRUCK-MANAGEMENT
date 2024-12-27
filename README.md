# Truck Management Dashboard

The Truck Management Dashboard is a React component designed to monitor truck journeys by providing real-time data on fuel levels, speed, distance covered, location, and engine temperature. It also includes an alert system to ensure safe and efficient journey management.

## Features

1. **Journey Control**:
   - Displays the current route progress.
   - Provides real-time updates on speed, distance, location, and engine temperature.

2. **Fuel Monitoring**:
   - Tracks fuel levels over time and displays a fuel history graph.
   - Visual indicator for current fuel level with critical alerts.

3. **Alert System**:
   - Issues warnings for critical fuel levels, high speed, high engine temperature, and the need for rest breaks.
   - Emergency alerts for refueling when fuel levels drop too low.

4. **Interactive UI**:
   - Intuitive slider to simulate journey progress.
   - Dynamic data visualization using recharts.
   - Mobile-responsive design.

## Tech Stack

- **React**: For building the user interface.
- **Recharts**: For rendering interactive charts.
- **Tailwind CSS**: For styling the components.
- **JavaScript**: For logic and data manipulation.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Import and render the `TruckDashboard` component in your React application:

```jsx
import React from 'react';
import TruckDashboard from './TruckMonitoringDashboard';

function App() {
  return (
    <div>
      <TruckDashboard />
    </div>
  );
}

export default App;
```

## How It Works

1. The `TruckDashboard` component calculates real-time data based on the journey progress using predefined route points.
2. Fuel level, speed, and alerts are dynamically updated as progress changes.
3. The `LineChart` from recharts visualizes fuel history, while alerts provide actionable insights.

## Predefined Route Points

- Ahmedabad (Distance: 0 km, Initial Fuel: 90%)
- Udaipur (Distance: 262 km, Fuel: 75%)
- Jaipur (Distance: 528 km, Fuel: 45%)
- Delhi (Distance: 946 km, Fuel: 15%)

## Customization

- Modify route points in the `routePoints` array to customize the journey.
- Adjust styling using Tailwind CSS classes.
- Extend or modify alerts in the `calculateData` function.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Developed using recharts for interactive charting.
- Styling inspired by Tailwind CSS for a clean and responsive UI.

---

Feel free to customize this README as needed!

