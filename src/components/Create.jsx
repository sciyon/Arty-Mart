import React, { useState, useCallback } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import Axios from "axios";

import SignedIn from '../layouts/signedin.jsx';
import chessCastle from '../images/chessCastle.png';
import insertImage from '../images/insertImage.jpg';
import { artCreateMutation } from '../backend/connect/artworkConnectResolvers.ts';
import { useAuth } from '../backend/middleware/authContext.jsx';
import { useToasts } from '../toastcontext.jsx';

const Create = () => {

  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;
  const { showToastPositive, showToastNegative } = useToasts(); 


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const [cloudinaryImage, setCloudinaryImage] = useState("")
  const { artnew } = artCreateMutation();  

  //Upload art key to monggodb and save image to cloudinare
  const uploadArt = async () => {

    if (isLoggedIn && imageFile && title && type && category && description && price && quantity ) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "s51txqkb");
  
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dyqbjfpka/image/upload",
          formData
        );
  
        console.log(response);
  
        if (response.data.public_id) {
          setCloudinaryImage(response.data.secure_url);
  
          const { result, error: artCreateError } = await artnew({
            imageURL: response.data.public_id,
            artist: user._id,
            title: title,
            type: type,
            categories: category,
            description: description,
            price: price,
            quantity: quantity
          });
  
          if (result) {
            showToastPositive(title + ' has been successfully published!');
          } else {
            showToastNegative(artCreateError || 'Artwork credentials invalid');
          }
        } else {
          showToastNegative('Image not successfully stored');
        }
      } catch (error) {
        console.log(error);
        showToastNegative('Error uploading image: ' + error.message);
      }
    } else {
      showToastNegative('Please fill out the important fields');
    }
  
    // Reset form fields and file input values
    setImageFile(null);
    setTitle('');
    setType('');
    setPrice('');
    setQuantity('');
    setDescription('');
    setCategory('');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = '';
    });
  };  

  return (
    <>
      <SignedIn />
      <div className="h-screen bg-cover bg-center relative flex" style={{ backgroundImage: `url(${chessCastle})`, filter: 'brightness(75%)' }}>
        <div className='fixed left-32 top-24 bg-tier1 h-[600px] w-[1350px] p-4 transform-gpu border-r-2 border-tier4 opacity-95 flex space-x-4'>
          {/* First Column */}
          <div className="flex-1 ml-8">

            <p htmlFor="imageUpload" className='mb-3 mt-12'>Upload Art Image:</p>
            <input 
              className="mb-4 block w-68 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
              type="file" 
              id="imageUpload1" 
              accept="image/*"
              onChange={handleImageUpload} />

            
            <div className='w-30% h-30% flex items-center justify-center'>
              {cloudinaryImage && (
                <div className="w-64 h-48 mb-5">
                  <img src={cloudinaryImage} alt="Artwork" className="w-full h-full object-cover" />
                </div>
              )}
              {!cloudinaryImage && (
                <div className="w-64 h-48 mb-5">
                  <img src={insertImage} alt="Insert Image" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <p htmlFor="imageUpload" className='mb-3'>Artpiece Title:</p>
            <div className='w-1/2 mb-6'>
              <TEInput
                  type="title"
                  placeholder="Title"
                  className='text-white'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              ></TEInput>
            </div>

            <p htmlFor="imageUpload" className='mb-3'>Type of Artpiece:</p>
            <div className='w-1/2 mb-6'>
              <TEInput
                  type="text"
                  placeholder="Type"
                  className='text-white'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
              ></TEInput>
            </div>


          </div>
          {/* Second Column */}
          <div className="flex-1 ml-8">
            <p htmlFor="description" className='mb-3 mt-12'>Art Description:</p>
              <div className='w-full mb-6'>
                <textarea
                  id="description"
                  placeholder="Description"
                  className='text-black rounded px-6 pb-2 w-[85%] h-32 pt-2.5 text-xs font-medium resize-none'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="flex">
                <div className="w-1/4 mb-6 mr-40">
                  <p htmlFor="price" className="mb-3 text-white">
                    Price:
                  </p>
                  <TEInput
                    id="price"
                    type="number"
                    placeholder="Price"
                    className="text-white"
                    value={price}
                    onChange={(e) => setPrice(Math.max(0, e.target.value))}
                  ></TEInput>
                </div>
                <div className="w-1/4 mb-6">
                  <p htmlFor="quantity" className="mb-3 text-white">
                    Quantity:
                  </p>
                  <TEInput
                    id="quantity"
                    type="number"
                    placeholder="Quantity"
                    className="text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  ></TEInput>
                </div>
            </div>

            <div className="flex-1 mb-6">
              <p className='mb-6'>Select Art Category:</p>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="painting"
                  name="artCategory"
                  value="Painting"
                  checked={category === "Painting"}
                  onChange={() => setCategory("Painting")}
                  className="mr-2"
                />
                <label htmlFor="painting" className="text-white mr-16">Painting</label>

                <input
                  type="radio"
                  id="sculpture"
                  name="artCategory"
                  value="Sculpture"
                  checked={category === "Sculpture"}
                  onChange={() => setCategory("Sculpture")}
                  className="mr-2"
                />
                <label htmlFor="sculpture" className="text-white mr-16">Sculpture</label>

                <input
                  type="radio"
                  id="drawing"
                  name="artCategory"
                  value="Drawing"
                  checked={category === "Drawing"}
                  onChange={() => setCategory("Drawing")}
                  className="mr-2"
                />
                <label htmlFor="drawing" className="text-white mr-16">Drawing</label>
              </div>
            </div>

            <div className="flex-1 mb-8">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="photography"
                  name="artCategory"
                  value="Photography"
                  checked={category === "Photography"}
                  onChange={() => setCategory("Photography")}
                  className="mr-2"
                />
                <label htmlFor="photography" className="text-white mr-8">Photography</label>

                <input
                  type="radio"
                  id="digitalArt"
                  name="artCategory"
                  value="Digital Art"
                  checked={category === "Digital Art"}
                  onChange={() => setCategory("Digital Art")}
                  className="mr-2"
                />
                <label htmlFor="digitalArt" className="text-white mr-14">Digital Art</label>

                <input
                  type="radio"
                  id="others"
                  name="artCategory"
                  value="Others"
                  checked={category === "Others"}
                  onChange={() => setCategory("Others")}
                  className="mr-2"
                />
                <label htmlFor="others" className="text-white">Others</label>
              </div>
            </div>

            <div className='flex-1 mb-6'>
            <TERipple rippleColor="light" className="w-1/2 flex items-center justify-center mx-auto">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                onClick={uploadArt}
                style={{
                  background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
              >
                Save Changes
              </button>
            </TERipple>
            </div>

          </div>
        </div>
      </div>    
    </>
  );
}

export default Create;
