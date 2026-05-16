

const ExtraSection = () => {
    const heroes = [
    {
      name: "Rahim Ahmed",
      location: "Dhaka",
      role: "Volunteer Rescuer",
      desc: "Helped rehome 50+ street dogs and fosters injured puppies.",
    },
    {
      name: "Nusrat Jahan",
      location: "Chattogram",
      role: "Animal Caregiver",
      desc: "Adopted stray cats and feeds street animals daily.",
    },
    {
      name: "Tanvir Hasan",
      location: "Sylhet",
      role: "Foster Home Owner",
      desc: "Rehabilitates abandoned pets for adoption.",
    },
    {
      name: "Ayesha Rahman",
      location: "Rajshahi",
      role: "Student Rescuer",
      desc: "Rescues and treats injured birds and kittens.",
    },
  ];
    return (
        <div>
            <div className="p-6 bg-amber-50 space-y-10">

     
      <div>
        <h2 className="text-2xl text-center font-bold mb-4">🐶 Why Adopt from PawMart?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Save innocent lives from streets and shelters",
            "Reduce unethical breeding practices",
            "Give loving homes to already existing pets",
            "Experience true unconditional love",
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl shadow-md bg-white hover:shadow-xl hover:-translate-y-2 transition duration-300 border"
            >
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Heroes Section */}
      <div>
        <h2 className="text-2xl text-center font-bold mb-4">🐶 Meet Our Pet Heroes</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroes.map((hero, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-md p-5 border cursor-pointer
                         hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-lg group-hover:text-green-600 transition">
                  {hero.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {hero.role} • {hero.location}
                </p>

                <p className="text-gray-600 text-sm opacity-80 group-hover:opacity-100 transition">
                  {hero.desc}
                </p>
              </div>

              {/* Hover effect glow */}
              <div className="h-1 w-0 bg-green-500 mt-3 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
            
        </div>
    );
};

export default ExtraSection;