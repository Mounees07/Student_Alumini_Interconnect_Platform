import { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { BACKEND_URL } from '../url';
import raj from "../assets/rajasthan.png"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    issueDescription: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/server/contact/addcontact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setFormData({
          name: '',
          email: '',
          phoneNo: '',
          issueDescription: ''
        });

      } else {
        console.error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <section className="px-8 py-8 lg:py-16">
    <div className="container mx-auto text-center">
      {/* Replace Typography with standard HTML tags */}
      <h5 className="mb-4 text-base lg:text-2xl text-blue-gray-700">
        Customer Care
      </h5>
      <h1 className="mb-4 text-3xl lg:text-5xl text-blue-gray-700">
        We&apos;re Here to Help
      </h1>
      <p className="mb-10 font-normal text-lg lg:mb-20 mx-auto max-w-3xl text-gray-500">
        Whether it&apos;s a question about our services, a request for
        technical assistance, or suggestions for improvement, our team is
        eager to hear from you.
      </p>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
       
<img 
  src={raj} 
  alt="map" 
  className="w-full h-full lg:max-h-[510px] rounded-3xl border-4 border-gray-200"
/>

        <form
          className="flex flex-col gap-4 lg:max-w-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              type="text"
              placeholder="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              type="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNo" value="Phone Number" />
            <TextInput
              type="text"
              placeholder="Phone Number"
              id="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="issueDescription" value="Issue Description" />
            <Textarea
              placeholder="Issue Description"
              id="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" color="gray">
            Submit
          </Button>
        </form>
      </div>
    </div>
  </section>
  );
};

export default Contact;
