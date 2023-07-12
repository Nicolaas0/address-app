export interface PhoneBookEntry {
    id: string;
    name: string;
    image: string;
    phone: string;
    address: string;
    email: string;
    country: string
  }
  
export interface GroupedData {
    [letter: string]: PhoneBookEntry[];
  }