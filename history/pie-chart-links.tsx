import React, { useState } from 'react';

const PieChartWithLinks = () => {
  // Demo data - each slice has a value from 1-5
  // Slices start at 12 o'clock and go clockwise
  const [slices] = useState([
    // Organization Foundations: weight 4
    { value: 5, name: 'Strategy & Leadership', link: 'https://example.com/strategy-leadership', weight: 4, category: 'Organization Foundations' },
    { value: 3, name: 'People & Culture', link: 'https://example.com/people-culture', weight: 4, category: 'Organization Foundations' },
    { value: 4, name: 'Architecture & Governance', link: 'https://example.com/architecture-governance', weight: 4, category: 'Organization Foundations' },
    // Product Lifecycle: weight 3
    { value: 2, name: 'Product Management', link: 'https://example.com/product-management', weight: 3, category: 'Product Lifecycle' },
    { value: 5, name: 'User Experience & Ethics', link: 'https://example.com/ux-ethics', weight: 3, category: 'Product Lifecycle' },
    // Data Infrastructure: weight 2
    { value: 3, name: 'Data Sourcing', link: 'https://example.com/data-sourcing', weight: 2, category: 'Data Infrastructure' },
    { value: 4, name: 'Data Operations', link: 'https://example.com/data-operations', weight: 2, category: 'Data Infrastructure' },
    { value: 2, name: 'Analytics', link: 'https://example.com/analytics', weight: 2, category: 'Data Infrastructure' },
    // AI & Machine Learning: weight 1
    { value: 3, name: 'Using AI Products', link: 'https://example.com/using-ai', weight: 1, category: 'AI & Machine Learning' },
    { value: 5, name: 'Building AI Products', link: 'https://example.com/building-ai', weight: 1, category: 'AI & Machine Learning' },
    { value: 1, name: 'Customers AI Products', link: 'https://example.com/customers-ai', weight: 1, category: 'AI & Machine Learning' }
  ]);

  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [animatedValues, setAnimatedValues] = useState(new Set());
  const [showScore, setShowScore] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  // Animation effect - pop out slices by value (lightest to darkest)
  React.useEffect(() => {
    const animateByValue = (value, delay) => {
      setTimeout(() => {
        setAnimatedValues(prev => new Set([...prev, value]));
      }, delay);
    };

    // Animate from value 1 (lightest) to value 5 (darkest)
    animateByValue(1, 300);
    animateByValue(2, 800);
    animateByValue(3, 1300);
    animateByValue(4, 1800);
    animateByValue(5, 2300);
    
    // Show score after all slices have popped out
    setTimeout(() => setShowScore(true), 2800);
    // Show AIQ label after score
    setTimeout(() => setShowLabel(true), 3300);
  }, []);

  // Calculate AIQ score
  const calculateScore = () => {
    return slices.reduce((total, slice) => total + (slice.value * slice.weight), 0);
  };

  const aiqScore = calculateScore();
  const maxScore = 140;

  // Blue gradient colors based on value (1-5)
  const getBlueShade = (value) => {
    const shades = [
      '#dbeafe', // value 1 - very light blue
      '#93c5fd', // value 2 - light blue
      '#3b82f6', // value 3 - medium blue
      '#1d4ed8', // value 4 - dark blue
      '#1e3a8a'  // value 5 - very dark blue
    ];
    return shades[value - 1];
  };

  const outerRadius = 150;
  const innerRadius = 90;
  const centerX = 200;
  const centerY = 200;
  const sliceAngle = 360 / 11;

  const createSlicePath = (index) => {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);

    const x1Outer = centerX + outerRadius * Math.cos(startAngle);
    const y1Outer = centerY + outerRadius * Math.sin(startAngle);
    const x2Outer = centerX + outerRadius * Math.cos(endAngle);
    const y2Outer = centerY + outerRadius * Math.sin(endAngle);
    
    const x1Inner = centerX + innerRadius * Math.cos(startAngle);
    const y1Inner = centerY + innerRadius * Math.sin(startAngle);
    const x2Inner = centerX + innerRadius * Math.cos(endAngle);
    const y2Inner = centerY + innerRadius * Math.sin(endAngle);

    return `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner} Z`;
  };

  const groupedByCategory = slices.reduce((acc, slice, index) => {
    const key = slice.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...slice, index });
    return acc;
  }, {});

  // Define category order
  const categoryOrder = [
    'Organization Foundations',
    'Product Lifecycle',
    'Data Infrastructure',
    'AI & Machine Learning'
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">AIQ Assessment Dashboard</h1>
      <p className="text-gray-600 mb-8">Score: {aiqScore} / {maxScore}</p>
      
      <div className="flex gap-12 items-start">
        <svg width="400" height="400" className="drop-shadow-lg">
          {slices.map((slice, index) => {
            const isAnimated = animatedValues.has(slice.value);
            return (
              <path
                key={index}
                d={createSlicePath(index)}
                fill={getBlueShade(slice.value)}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                style={{
                  opacity: hoveredSlice === null || hoveredSlice === index ? 1 : 0.3,
                  transform: hoveredSlice === index 
                    ? 'scale(1.05)' 
                    : isAnimated 
                      ? 'scale(1)' 
                      : 'scale(0.8)',
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transition: hoveredSlice === index 
                    ? 'all 0.2s ease-out' 
                    : 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={() => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
                onClick={() => window.open(slice.link, '_blank')}
              />
            );
          })}
          
          {/* Center text */}
          <text
            x={centerX}
            y={centerY - 15}
            textAnchor="middle"
            className="fill-gray-600 font-bold"
            style={{ 
              fontSize: '18px',
              opacity: showLabel ? 1 : 0,
              transition: 'opacity 0.8s ease-in'
            }}
          >
            AIQ® Score
          </text>
          <text
            x={centerX}
            y={centerY + 20}
            textAnchor="middle"
            className="fill-gray-800 font-bold"
            style={{ 
              fontSize: '36px',
              opacity: showScore ? 1 : 0,
              transition: 'opacity 0.8s ease-in'
            }}
          >
            {aiqScore}
          </text>
        </svg>

        <div className="flex flex-col gap-6">
          {categoryOrder.map((categoryName) => {
            const items = groupedByCategory[categoryName];
            return (
              <div key={categoryName} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-gray-700 mb-3">
                  {categoryName}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li 
                      key={item.index}
                      className={`flex items-center gap-2 transition-all duration-200 ${
                        hoveredSlice === item.index ? 'font-semibold' : ''
                      }`}
                      onMouseEnter={() => setHoveredSlice(item.index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    >
                      <div 
                        className="w-4 h-4 rounded flex-shrink-0"
                        style={{ backgroundColor: getBlueShade(item.value) }}
                        title={`Value: ${item.value}`}
                      />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {item.name}
                      </a>
                      <span className="text-xs text-gray-500 ml-auto">
                        {item.value * item.weight} pts
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h3 className="font-bold text-gray-700 mb-2">Color Legend</h3>
            <div className="space-y-1 text-sm">
              {[5, 4, 3, 2, 1].map(val => (
                <div key={val} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: getBlueShade(val) }}
                  />
                  <span className="text-gray-600">Value {val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-center max-w-md">
        Hover over slices or links to highlight them. Click on any slice to open its link. 
        Darker blue indicates higher values (1-5).
      </p>
    </div>
  );
};

export default PieChartWithLinks;