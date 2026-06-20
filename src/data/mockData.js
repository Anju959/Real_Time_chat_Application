// Avatar URLs using DiceBear API for consistent, unique avatars
const avatarUrl = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const currentUser = {
  id: 'user-0',
  name: 'You',
  email: 'you@chatapp.com',
  avatar: avatarUrl('you'),
  status: 'online',
};

export const users = [
  { id: 'user-1', name: 'Anjali', avatar: avatarUrl('anjali'), status: 'online', lastSeen: 'Online' },
  { id: 'user-2', name: 'Sravya', avatar: avatarUrl('sravya'), status: 'online', lastSeen: 'Online' },
  { id: 'user-3', name: 'Srikanth', avatar: avatarUrl('srikanth'), status: 'offline', lastSeen: '2 hours ago' },
  { id: 'user-4', name: 'Naveen', avatar: avatarUrl('naveen'), status: 'online', lastSeen: 'Online' },
  { id: 'user-5', name: 'Arshu', avatar: avatarUrl('arshu'), status: 'offline', lastSeen: '30 min ago' },
  { id: 'user-6', name: 'Mounika', avatar: avatarUrl('mounika'), status: 'offline', lastSeen: 'Yesterday' },
  { id: 'user-7', name: 'Deepika', avatar: avatarUrl('deepika'), status: 'online', lastSeen: 'Online' },
  { id: 'user-8', name: 'Anusha', avatar: avatarUrl('anusha'), status: 'offline', lastSeen: '5 hours ago' },
];

const now = Date.now();
const min = 60 * 1000;
const hr = 60 * min;

export const initialConversations = [
  {
    id: 'conv-1',
    participantId: 'user-1',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 'user-1', text: 'Hey! Have you seen the new design mockups?', timestamp: now - 3 * hr, status: 'read' },
      { id: 'm2', senderId: 'user-0', text: 'Not yet! Can you share the link?', timestamp: now - 3 * hr + 2 * min, status: 'read' },
      { id: 'm3', senderId: 'user-1', text: 'Sure, just sent it to your email 📧', timestamp: now - 2 * hr, status: 'read' },
      { id: 'm4', senderId: 'user-0', text: 'Got it, these look amazing! Love the color palette 🎨', timestamp: now - 2 * hr + 5 * min, status: 'read' },
      { id: 'm5', senderId: 'user-1', text: 'Right? The gradient on the header is perfect', timestamp: now - 1 * hr, status: 'read' },
      { id: 'm6', senderId: 'user-1', text: 'Can we discuss the responsive layout tomorrow?', timestamp: now - 30 * min, status: 'delivered' },
    ],
  },
  {
    id: 'conv-2',
    participantId: 'user-2',
    unread: 0,
    messages: [
      { id: 'm7', senderId: 'user-2', text: 'The deployment went smoothly! 🚀', timestamp: now - 5 * hr, status: 'read' },
      { id: 'm8', senderId: 'user-0', text: 'Awesome work, Marcus! Zero downtime?', timestamp: now - 5 * hr + 3 * min, status: 'read' },
      { id: 'm9', senderId: 'user-2', text: 'Yep, blue-green deployment worked like a charm', timestamp: now - 4 * hr, status: 'read' },
      { id: 'm10', senderId: 'user-0', text: 'Perfect. Let me know if anything comes up', timestamp: now - 4 * hr + 1 * min, status: 'delivered' },
    ],
  },
  {
    id: 'conv-3',
    participantId: 'user-3',
    unread: 1,
    messages: [
      { id: 'm11', senderId: 'user-0', text: 'Hi Priya, are you coming to the standup?', timestamp: now - 8 * hr, status: 'read' },
      { id: 'm12', senderId: 'user-3', text: 'Yes! Running 5 min late though 🏃‍♀️', timestamp: now - 8 * hr + 2 * min, status: 'read' },
      { id: 'm13', senderId: 'user-3', text: 'Also, I pushed the API changes. Can you review when you get a chance?', timestamp: now - 7 * hr, status: 'delivered' },
    ],
  },
  {
    id: 'conv-4',
    participantId: 'user-4',
    unread: 0,
    messages: [
      { id: 'm14', senderId: 'user-4', text: 'Movie night this Friday? 🍿', timestamp: now - 24 * hr, status: 'read' },
      { id: 'm15', senderId: 'user-0', text: 'Count me in! What are we watching?', timestamp: now - 24 * hr + 10 * min, status: 'read' },
      { id: 'm16', senderId: 'user-4', text: 'Thinking Dune Part Two or Oppenheimer', timestamp: now - 23 * hr, status: 'read' },
      { id: 'm17', senderId: 'user-0', text: 'Dune for sure! 🏜️', timestamp: now - 23 * hr + 5 * min, status: 'delivered' },
    ],
  },
  {
    id: 'conv-5',
    participantId: 'user-5',
    unread: 3,
    messages: [
      { id: 'm18', senderId: 'user-5', text: 'The client loved the presentation! 🎉', timestamp: now - 2 * hr, status: 'read' },
      { id: 'm19', senderId: 'user-0', text: 'That is great news!', timestamp: now - 2 * hr + 1 * min, status: 'read' },
      { id: 'm20', senderId: 'user-5', text: 'They want to move forward with phase 2', timestamp: now - 1 * hr, status: 'delivered' },
      { id: 'm21', senderId: 'user-5', text: 'Meeting scheduled for Monday at 10am', timestamp: now - 45 * min, status: 'delivered' },
      { id: 'm22', senderId: 'user-5', text: 'Can you prepare the technical roadmap?', timestamp: now - 20 * min, status: 'delivered' },
    ],
  },
  {
    id: 'conv-6',
    participantId: 'user-6',
    unread: 0,
    messages: [
      { id: 'm23', senderId: 'user-6', text: 'Thanks for helping with the bug fix!', timestamp: now - 48 * hr, status: 'read' },
      { id: 'm24', senderId: 'user-0', text: 'Anytime! Glad we figured it out', timestamp: now - 48 * hr + 5 * min, status: 'read' },
    ],
  },
  {
    id: 'conv-7',
    participantId: 'user-7',
    unread: 0,
    messages: [
      { id: 'm25', senderId: 'user-7', text: 'The new onboarding flow is live! ✨', timestamp: now - 6 * hr, status: 'read' },
      { id: 'm26', senderId: 'user-0', text: 'Looks beautiful, Sofia! Great job on the animations', timestamp: now - 6 * hr + 3 * min, status: 'read' },
      { id: 'm27', senderId: 'user-7', text: 'Thanks! The Lottie animations really made it pop', timestamp: now - 5 * hr, status: 'read' },
    ],
  },
  {
    id: 'conv-8',
    participantId: 'user-8',
    unread: 0,
    messages: [
      { id: 'm28', senderId: 'user-0', text: 'Hey David, do you have the analytics report?', timestamp: now - 30 * hr, status: 'read' },
      { id: 'm29', senderId: 'user-8', text: 'Yes! Sending it over now 📊', timestamp: now - 29 * hr, status: 'read' },
      { id: 'm30', senderId: 'user-8', text: 'Monthly active users are up 23%!', timestamp: now - 29 * hr + 2 * min, status: 'read' },
      { id: 'm31', senderId: 'user-0', text: 'Incredible growth! The team will be thrilled 🎯', timestamp: now - 28 * hr, status: 'delivered' },
    ],
  },
];
