const About = () => {
    return (
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            {/* About Us Section */}
            <section className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place, we have granted to God, and by this, our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from
                    </p>
                </div>
                <div className="w-full lg:w-8/12">
                    <img
                        className="w-full h-full object-cover"
                        src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                        alt="A group of people"
                    />
                </div>
            </section>

            {/* Our Story Section */}
            <section className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place, we have granted to God, and by this, our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from
                    </p>
                </div>

                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        {/* Team Member Cards */}
                        {[
                            { name: "Alexa", imageUrl: "https://i.ibb.co/FYTKDG6/Rectangle-118-2.png", alt: "Alexa featured Img" },
                            { name: "Olivia", imageUrl: "https://i.ibb.co/fGmxhVy/Rectangle-119.png", alt: "Olivia featured Img" },
                            { name: "Liam", imageUrl: "https://i.ibb.co/Pc6XVVC/Rectangle-120.png", alt: "Liam featured Img" },
                            { name: "Elijah", imageUrl: "https://i.ibb.co/7nSJPXQ/Rectangle-121.png", alt: "Elijah featured Img" }
                        ].map((member, index) => (
                            <div className="p-4 pb-6 flex justify-center flex-col items-center" key={index}>
                                <img
                                    className="md:block hidden"
                                    src={member.imageUrl}
                                    alt={member.alt}
                                />
                                <img
                                    className="md:hidden block"
                                    src={member.imageUrl.replace("-2", "")}
                                    alt={member.alt}
                                />
                                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">{member.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
  };
  
  export default About;
  