import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineCamera, HiOutlineUser, HiOutlineVideoCamera } from 'react-icons/hi';
import { HiOutlineHandRaised } from 'react-icons/hi2';
import { AiOutlineMore } from 'react-icons/ai';
import { SlLike } from 'react-icons/sl';
import { toast } from 'react-toastify';
import { postContent, getContent } from '../services/post';
import LoadingIndicator from '../components/loadingIndicator';

const HomePage = () => {
    const hiddenInput = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [data, setData] = useState({description: '', status: 'public'});
    const [loading, setLoading] = useState<Boolean>(false)
    const [contents, setContents] = useState<any>([]);

    const populateContent = async () => {
        const res = await getContent();
        setContents(res);
    }

    const handleClick = (e: any) => {
        hiddenInput.current?.click();
    }
    
    const handleChange = ({target}: any) => {
        setData({...data, [target.name]: target.value});
    }

    const handleMedia = ({target}: any) => {
        const reader = new FileReader();
        
        const selectedFile = target.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        
        reader.onload = (readerEvent: any) => {
            if (selectedFile.type.includes("image")) {
                setImagePreview(readerEvent.target.result);
            } else if (selectedFile.type.includes("video")) {
                setVideoPreview(readerEvent.target.result);
            }
        };
    }

    useEffect(() => {
        populateContent()
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const {description, status} = data;
        let media = [imagePreview];

        const payload = {
            description,
            status,
            media: media.concat(videoPreview)
        }

        setLoading(true)
        const res = await postContent(payload);

        // if(res.status === 200) {
        //     setLoading(false);
        //     toast("Content Created Successfully!", {
        //       position: "top-right",
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     })
      
        //     setData({description: '', status: 'private'});
        //     setImagePreview(null);
        //     setVideoPreview(null);
        //   } else {
        //     toast("Try again later", {
        //       position: "top-right",
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     })
        // }
    }

    return (
        <>
            <LoadingIndicator visible={loading} />
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-md-1 col-4">
                        <div className="avatar rounded-circle">
                            <HiOutlineUser size={24} color={'#EBA754'} />
                        </div>
                    </div>
                    <div className="col-md-7 col-8">
                        <form onSubmit={handleSubmit}>
                            <div className="border p-1 rounded">
                                <textarea placeholder='Share your thoughts ?' id="" rows={4} className="form-control border-0 text-muted f-13" name="description" value={data.description} onChange={handleChange}></textarea>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className='d-flex align-items-center'>
                                        {imagePreview != null && <img className='m-2 rounded' width={80} height={60} src={imagePreview} alt="" />}
                                        {videoPreview != null && <video className='m-2 rounded' width={80} height={60} controls src={videoPreview}></video>}
                                    </div>
                                    <button className="btn btn-sm px-3 mt-3" type='submit'>
                                        <span className='text-primary'><b>Publish</b></span>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex align-items-center my-2">
                                <input
                                    type="file"
                                    ref={hiddenInput}
                                    onChange={handleMedia}
                                    style={{display: 'none'}}
                                />
                                <button className='btn px-2' onClick={handleClick} type="button">
                                    <HiOutlineCamera size={23} /> <small>Image / Video</small>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr />
                <div className="my-4">
                    <h3 className='font-weight-bold text-black-50 mb-4'>Our Feeds</h3>
                    <div className="row justify-content-center pt-2">
                        {/* {contents?.map((item: any, key: any) => (
                            <div key={key} className="col-md-6 my-2">
                                <div className="border rounded p-2">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="media">
                                            <div className="avatar rounded-circle">
                                                <HiOutlineUser size={24} color={'#EBA754'} />
                                            </div>
                                            <div className="media-body pl-2">
                                                <h6 className='m-0'><small><b>{item.owner.username}</b></small></h6>
                                                <small className='text-muted f-13'>12 minutes ago</small>
                                            </div>
                                        </div>
                                        <button className='btn'><AiOutlineMore size={18} color={'#B6B7BF'} /></button>
                                    </div>
                                    <p className='px-2'>{item.description}</p>
                                    <div className="d-flex align-items-center my-2">
                                        
                                        <button className='btn px-2 text-muted'>
                                            <SlLike size={15} /> <small>Like post</small>
                                        </button>
                                        <button className='btn px-2 text-muted'>
                                            <HiOutlineHandRaised size={15} /> <small>Vote post</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default HomePage;
