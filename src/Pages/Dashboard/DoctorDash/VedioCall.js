import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"

const socket = io.connect('https://doctors-portal-server-blush-psi.vercel.app')
const VedioCall = () => {
    const booking = useLoaderData();

    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    let i = '';
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream
        })

        socket.on("me", async (id) => {
            setMe(id);
            i = id;
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }
    console.log('me', me);
    setTimeout(() => {
        console.log('timmme');
      
            console.log('not null',me);
            const a={
                collerid:me
            }
            fetch(`https://doctors-portal-server-blush-psi.vercel.app/vediocall/${booking._id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(a)
            })
                .then(res => res.json())
                .then(result => {

                })
        }
       
    , 5000)
    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }
    return (
        <div>
            <h1>Csll</h1>
            <>
                <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
                <div className='p-4'>
                    <div className="video-container">
                        <div className="video">
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        </div>
                        <div className="video">
                            {callAccepted && !callEnded ?
                                <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                                null}
                        </div>
                    </div>
                    <div className="myId">
                        <input
                            id="filled-basic"
                            label="Name"
                            variant="filled"
                            value={name}
                            placeholder='name'
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: "20px" }}
                        />
                        <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                            <button className='btn btn-primary' >
                                Copy ID
                            </button>
                        </CopyToClipboard>

                        <input
                            id="filled-basic"
                            label="ID to call"
                            variant="filled"
                            value={idToCall}
                            placeholder='id'
                            onChange={(e) => setIdToCall(e.target.value)}
                        />
                        <div className="call-button">
                            {callAccepted && !callEnded ? (
                                <button className='btn btn-primary' onClick={leaveCall}>
                                    End Call
                                </button>
                            ) : (
                                <button className='btn btn-primary' onClick={() => callUser(idToCall)}>
                                    <button className='btn btn-primary' >Call</button>
                                </button>
                            )}
                            {idToCall}
                        </div>
                    </div>
                    <div className='mb-10'>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <button className='btn btn-primary' onClick={answerCall}>
                                    Answer
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </>
        </div>
    );
};

export default VedioCall;