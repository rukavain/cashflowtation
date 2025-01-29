export default function Dashboard() {
  const dummyData = [
    {
      id: "1",
      name: "Lunch at Cafe",
      category: "food",
      price: 15.5,
      date: "2025-01-15",
      description: "Lunch with a friend at a local cafe.",
      paymentMethod: "credit card",
      transactionID: "TXN123456",
      image: "/food.png",
    },
    {
      id: "2",
      name: "Gift for Birthday",
      category: "gift",
      price: 50.0,
      date: "2025-01-17",
      description: "Bought a birthday gift for a friend.",
      paymentMethod: "debit card",
      transactionID: "TXN123457",
      image: "/gift.png",
    },
    {
      id: "3",
      name: "Uber ride to airport",
      category: "transportation",
      price: 35.75,
      date: "2025-01-20",
      description: "Uber ride to the airport for a business trip.",
      paymentMethod: "paypal",
      transactionID: "TXN123458",
      image: "/transportation.png",
    },
    {
      id: "4",
      name: "Groceries",
      category: "food",
      price: 72.25,
      date: "2025-01-21",
      description: "Weekly grocery shopping at the supermarket.",
      paymentMethod: "credit card",
      transactionID: "TXN123459",
      image: "/food.png",
    },
    {
      id: "5",
      name: "Gas for car",
      category: "transportation",
      price: 40.0,
      date: "2025-01-22",
      description: "Filled up gas for the car.",
      paymentMethod: "cash",
      transactionID: "TXN123460",
      image: "/transportation.png",
    },
    {
      id: "6",
      name: "Yoga class membership",
      category: "personal",
      price: 120.0,
      date: "2025-01-10",
      description: "Monthly membership for yoga studio.",
      paymentMethod: "credit card",
      transactionID: "TXN123461",
      image: "/personal.png",
    },
    {
      id: "7",
      name: "Movie tickets",
      category: "entertainment",
      price: 28.5,
      date: "2025-01-12",
      description: "Two tickets for a movie night with a friend.",
      paymentMethod: "debit card",
      transactionID: "TXN123462",
      image: "/gift.png",
    },
    {
      id: "8",
      name: "Lunch at Work",
      category: "food",
      price: 10.25,
      date: "2025-01-14",
      description: "Quick lunch at the office cafeteria.",
      paymentMethod: "cash",
      transactionID: "TXN123463",
      image: "/food.png",
    },
    {
      id: "9",
      name: "Shoes for the Gym",
      category: "personal",
      price: 85.0,
      date: "2025-01-18",
      description: "Bought new shoes for working out.",
      paymentMethod: "credit card",
      transactionID: "TXN123464",
      image: "/personal.png",
    },
    {
      id: "10",
      name: "Taxi to dinner",
      category: "transportation",
      price: 18.0,
      date: "2025-01-19",
      description: "Taxi ride to dinner at a restaurant.",
      paymentMethod: "cash",
      transactionID: "TXN123465",
      image: "/transportation.png",
    },
  ];
  return (
    <main className="flex mx-6 my-2 flex-col justify-evenly items-center gap">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 justify-center items-center">
          <img className="h-10" src="/hamburger.png" alt="" />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
        <div>
          <div className="bg-gray-400 px-4 py-2 rounded-full">
            <h1 className="font-bold text-white text-2xl">A</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-12 bg-black text-white w-full rounded-3xl px-6 my-12">
        <div className="flex gap-4 font-bold justify-start items-center">
          <h1 className="text-3xl">₱</h1>
          <h1 className="text-5xl">150,000</h1>
        </div>
        <h1 className="font-bold text-md text-gray-500">PHP</h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-1 w-full ">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="font-bold text-lg">All expenses</h1>
          <button className="py-2 px-4 bg-gray-300 rounded-xl font-bold text-gray-400">
            View all
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {dummyData.map((data) => (
          <a
            key={data.id}
            className="w-full flex justify-between items-center bg-slate-300 rounded-xl p-3"
          >
            <div className=" flex justify-center items-center gap-4">
              <div className="p-3 rounded-md bg-gray-300 border border-gray-400">
                <img className="h-8" src={data.image} alt="" />
              </div>
              <div>
                <h1 className="font-bold">{data.name}</h1>
                <h1 className="text-xs font-semibold text-gray-500">
                  {data.description}
                </h1>
              </div>
            </div>
            <div>
              <h1 className="font-bold">
                <span>₱</span>
                {data.price}
              </h1>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
