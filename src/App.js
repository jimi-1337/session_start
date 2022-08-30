import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import user_img from './user.png'
import { useEffect, useState } from 'react';
import back_img from './back_img.jpg';
import { BsFillArrowRightCircleFill } from  'react-icons/bs';
import { MdOutlineCancel } from  'react-icons/md';
// import Worker from "./worker";

function App() {
  const worker = new Worker('./worker.js');
  const [blackScreen, setblackScreen] = useState(false);
  const [W_pass, setWpass] = useState(false);
  const [vib, setvib] = useState('');
  const [dis, setdis] = useState(false);

  // useEffect()
  useEffect(() => {
    worker.postMessage('hello, worker');
    if (!document.fullscreenElement) {
      openFullscreen();
    }
    inactivityTime();
  });
  const inactivityTime = function () {
    var time;
    window.onload = resetTimer;
      // DOM Events
    document.onmousemove = resetTimer;
    window.addEventListener("keydown", function(event) { resetTimer() });
    function resetTimer() {
      document.body.style.cursor = 'unset';
        if(blackScreen)
          setblackScreen(false);
        clearTimeout(time);
        time = setTimeout(() => {
          setblackScreen(true);
          document.body.style.cursor = 'none';
        }, 120000)
    }
  };
  const openFullscreen = () => {
    window.addEventListener(
      "beforeunload",
      function(e) {
          e.stopPropagation();
          e.preventDefault();
          return false;
      },
      true
    );
    window.addEventListener("keydown", function(event) {
      console.log(event.code);
      if (event.defaultPrevented) {
        return;
      }
      if (event.code == 'ArrowDown')
        document.body.requestFullscreen();
      if (event.metaKey) {
          // if (event.code == 'KeyR') {
              event.preventDefault();
              event.stopPropagation();
          // }
      }

    });
  }
  // openFullscreen();
  const handleinput = (event) => {
    setWpass(true);
    window.navigator.vibrate(200);
    if (event.target.value.length == 0)
      setWpass(false);
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setdis(true);
      await timeout(1500);
      setvib('vibrate');
      await timeout(500);
      setdis(false);
      setvib('');
    }
  };

  async function handlecancel() {
    // var time;
    // clearTimeout(time);
    // time = setTimeout(() => {
      await timeout(300);
      if (!blackScreen) {
        setblackScreen(true);
        document.body.style.cursor = 'none';
      }
    //  }, 300);
  }

  return (
    <div id="Session">
      {
        blackScreen
        ? <div className='blackscreen'></div>
        : 
        <>
          <img src={back_img} alt="" style={{width:"100%", height:"100vh"}} className='img'/>
          <div className='content'>
            <div className="form-group d-flex flex-column align-items-center justify-content-center" style={{height: "100vh"}}>
              <div>
                <div className='text-center mb-3'>
                  <img src={user_img} alt="" width="100" height="100" className='mb-3 rounded-circle'/>
                  <h5 className='text-white'>Moujane Ayoub</h5>
                </div>
                <div className={`d-flex ${vib}`}>
                    <input disabled={dis} type="password" onKeyDown={handleKeyDown} onChange={handleinput} placeholder='Enter Password' className="password opacity-50 border-0 rounded-2 p-2 ms-2" style={{ height: "2rem" }} id="pass"/>
                    {
                      W_pass &&
                      <div className='ms-3'>
                        <BsFillArrowRightCircleFill />
                      </div>
                    }
                </div>
              </div>
              <div className='text-white position-buttom' >mds_1.0-p - e3r9p3.1337.ma</div>
              <div className='cancelPos text-center'>
                <MdOutlineCancel size={40} onClick={handlecancel}/>
                <h6 className='text-white'>Cancel</h6>
              </div>
            </div>
          </div>
        </>
      }
      
    </div>
  );
}

export default App;
