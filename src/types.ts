export type RepairCategory = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  averageCostPKR: string;
  description: string;
};

export type RepairBooking = {
  id: string;
  ticketNumber: string;
  customerName: string;
  phoneNumber: string;
  deviceModel: string;
  problem: string;
  additionalNotes?: string;
  preferredContact: 'whatsapp' | 'call' | 'both';
  createdAt: string;
  status: 'Received' | 'Diagnosing' | 'In Repair' | 'Testing' | 'Ready for Pickup';
  estimatedCost?: string;
};

export type DeviceBrand = {
  id: string;
  name: string;
  popularModels: string[];
};
