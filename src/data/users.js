// This is a mock database. In a real app, this would be a backend service
export const USERS = [
  {
    id: 1,
    email: 'demo@example.com',
    password: 'demo123', // In real app, passwords would be hashed
    name: 'Demo User',
    address: '123 Main St, City, Country',
    purchaseHistory: [
      {
        id: 'ORD001',
        date: '2024-03-15',
        total: 1299.98,
        items: [
          { id: 1, title: 'Apple iPhone 13 Pro', price: 999.99, quantity: 1 },
          { id: 3, title: 'Sony WH-1000XM4', price: 299.99, quantity: 1 }
        ],
        status: 'Delivered'
      }
    ]
  }
];