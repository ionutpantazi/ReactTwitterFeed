import React from "react"
import { Timeline } from 'react-twitter-widgets'

const TwitterCard = ({ input }) => {
  return (
    <div className='twitterCard'>
      <Timeline
        dataSource={{
          sourceType: 'url',
          url: 'https://twitter.com/' + input
        }}
        options={{
          height: '400',
          tweetLimit: 10,
          chrome: "noheader, nofooter"
        }}
        renderError={() =>
          <Error input={input} />
        }
      />
    </div>
  )
}



const Error = ({ input }) => {
  return (
    <div className='errorContainer'>
      <span>
        Error: Input: "{input}". Nothing found on twitter. Try searchig for something else.
      </span>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      searchTwitter: ''
    }
  }

  render() {
    let { input, searchTwitter } = this.state
    let validate = /[$-/:-?{~!"^`\]\\]/
    let isValid = !validate.test(searchTwitter)
    let isLengthOk = searchTwitter.length < 21 && searchTwitter.length > 3 ? true : false
    let check = isValid && isLengthOk ? true : false
    return (
      <div>
        <div className="searchBox">
          <input
            className="input"
            placeholder="Search twitter"
            value={input}
            onChange={({ target: { value: input } }) => this.setState({ input })}
          />
          <button
            className="searchButton"
            onClick={() => this.setState({ searchTwitter: input })}
          >
            <img
              src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-magnifier-3.png&r=255&g=255&b=255'
              alt='searchImg'
              height='25px'>
            </img>
          </button>
        </div>
        {searchTwitter && check &&
          <TwitterCard input={searchTwitter} />
        }
        {searchTwitter && !check &&
          <div className='errorContainer' style={{ marginTop: 10 }}>
            Error: Invalid input.
          </div>
        }
        {!searchTwitter &&
          <div className='landingContainer' style={{ marginTop: 10 }}>
            Use the above search box to find the last 10 posts from an account. Input text must contain at least 4 characters, but not
            more than 20. Restricted characters are also forbidden.
          </div>
        }
      </div>
    )
  }
}

export default App
