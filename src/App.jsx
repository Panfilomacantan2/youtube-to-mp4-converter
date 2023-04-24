import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { youtube_parser } from './utils';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiDownload } from 'react-icons/hi';

const App = () => {
	const inputRef = useRef(null);
	const [urlSearch, setUrlSearch] = useState(null);
	const [videoId, setVideoId] = useState('');

	function handleSearch(e) {
		e.preventDefault();
		setUrlSearch(inputRef.current.value);

		if (!inputRef.current.value) return;

		console.log(inputRef.current.value);

		const youtubeID = youtube_parser(inputRef.current.value);

		setVideoId(youtubeID);

		console.log(youtubeID);

		const options = {
			method: 'GET',
			url: 'https://youtube-mp36.p.rapidapi.com/dl',
			params: { id: youtubeID },
			headers: {
				'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
				'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setUrlSearch(response.data.link);
			})
			.catch(function (error) {
				console.error(error);
			});

		inputRef.current.value = '';
	}

	return (
		<div className=" w-[350px] bg-white py-10 px-8 rounded-md">
			<form onSubmit={handleSearch} className="w-full flex">
				<input className=" border-slate-400 border px-5 py-2 outline-none w-full" type="text" placeholder="Paste the URL here..." name="urlSearch" ref={inputRef} />
				<button className=" bg-slate-800 hover:bg-slate-900 text-slate-50 border-none py-2 px-5 flex justify-center items-center " type="submit">
					<FiSearch className="text-white mr-2" />
					Search
				</button>
			</form>

			<div className=" space-y-12 mt-12 w-full">
				{!urlSearch && (
					<div className=" w-full rounded-md h-60 border-slate-500 border-dashed border-2 bg-slate-200 flex justify-center items-center">
						<FaCloudDownloadAlt className="text-5xl text-slate-400 mx-auto block" />
					</div>
				)}

				{videoId && <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="youtube thumbnail" className=" sm:w-full max-w-sm rounded-md border-dashed" />}

				<a
					rel="noreferrer"
					target="_blank"
					href={urlSearch}
					className="px-7 py-3 bg-slate-900 text-white rounded-md  text-center font-semibold hover:bg-slate-800 cursor-pointer flex justify-center items-center gap-2"
				>
					<HiDownload /> Download
				</a>
			</div>
		</div>
	);
};

export default App;
