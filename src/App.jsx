import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import "./App.css";
import send from "./icons/send.png";
import copyicon from "./icons/copy.png";
import copiedicon from "./icons/copied.png";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [active, setActive] = useState(false);
  const [copy, setCopy] = useState(false);

  const apiKey = "R5aViMrhDayEEij1Qu7UPeHbWSQ3iYY4raRXj4ZCu1QLw";

  async function handleSubmit(e) {
    e.preventDefault();

    setActive(true);

    try {
      const response = await axios.post(
        "https://api.tinyurl.com/create?api_token=gtirENbErc6AHFBtdMtHsQQDayDAaojgDD0uQvgtPVlVD9yCLHdVQtzAzZiN",
        {
          url: originalUrl,
        }
      );
      console.log(response.data.data.tiny_url);

      setShortenedUrl(response.data.data.tiny_url);
    } catch (error) {
      alert(error.message);
      console.error("Error shortening URL:", error);
    }

    setOriginalUrl("");
    console.log(shortenedUrl);
  }

  return (
    <>
      <div className="App py-2">
        <h2>A Simple Bitly Link Shortener</h2>
        <div>
          {!shortenedUrl ? (
            <form method="post" action="" onSubmit={handleSubmit}>
              <input
                name="long_url"
                type="text"
                value={originalUrl}
                placeholder="Paste your url"
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
              {originalUrl ? (
                <button type="submit">
                  <img src={send} alt="send icon" id="send_icon" />
                </button>
              ) : (
                ""
              )}
            </form>
          ) : (
            ""
          )}
        </div>

        {/* show on success... */}

        {active ? (
          <div className="show_links">
            <img src={copiedicon} alt="Qr code" className="qr_img" />
            <div>
              <h3>Here's your short link...</h3>
              <span>
                <p>{shortenedUrl}</p>
                <CopyToClipboard
                  onCopy={() => {
                    setCopy(true);
                  }}
                  text={shortenedUrl}
                >
                  {!copy ? (
                    <img
                      src={copyicon}
                      alt="copy icon"
                      width="17px"
                      height="17px"
                    />
                  ) : (
                    <img
                      src={copiedicon}
                      alt="copy icon"
                      width="17px"
                      height="17px"
                    />
                  )}
                </CopyToClipboard>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
