export default function Home(props) {
  return (
      <div className="header-image" style={{ backgroundImage: "url(/veggies.jpeg)" }}>
        <div className="header-content">
          <h1 id="title-animation" className="h1">Support local stores in your neigborhood</h1>
          <p id="subtitle-animation" className="paragraph">Enter your postal code to start shopping</p>
          <input class="postal" placeholder="eg. H1X 4F5"></input>
          <p className="paragraph-2">Get your fresh local products basket in couple clicks</p>
        </div>
      </div>
  )
}

