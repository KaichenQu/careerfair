export interface Company {
  id: number;          // Changed to number
  company_name: string;
  industry: string;
  location: {
    city: string;
    country: string;
  };
  contact: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  positions_offered: Position[];
}

export interface Position {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract';
  experience_level: 'entry' | 'mid' | 'senior';
  status: 'open' | 'closed';
}

// Updated sample data with integer IDs
export const sampleCompanies: Company[] = [
  {
    id: 1,            // This is the ID that matches the URL
    company_name: "Tech Innovators Ltd",
    industry: "Technology",
    location: {
      city: "San Francisco",
      country: "USA"
    },
    contact: {
      name: "John Smith",
      position: "HR Manager",
      email: "hr@techinnovators.com",
      phone: "+1 (555) 123-4567"
    },
    positions_offered: [
      {
        id: "pos_001",
        title: "Senior Software Engineer",
        department: "Engineering",
        type: "full-time",
        experience_level: "senior",
        status: "open"
      },
      {
        id: "pos_002",
        title: "Product Manager",
        department: "Product",
        type: "full-time",
        experience_level: "mid",
        status: "open"
      }
    ]
  },
  {
    id: 2,            // Second company's ID
    company_name: "Green Energy Solutions",
    industry: "Energy",
    location: {
      city: "Berlin",
      country: "Germany"
    },
    contact: {
      name: "Maria Schmidt",
      position: "Talent Acquisition Lead",
      email: "careers@greenenergy.com",
      phone: "+49 30 12345678"
    },
    positions_offered: [
      {
        id: "pos_003",
        title: "Energy Analyst",
        department: "Research",
        type: "full-time",
        experience_level: "entry",
        status: "open"
      }
    ]
  }
]; 