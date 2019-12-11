import React, { useEffect, useState } from 'react';

const RSSCombiner = require('rss-combiner');
const xml2js = require('xml2js');

const feedConfig = {
  title: 'Tech news from Guardian and BBC',
  size: 20,
  feeds: [
    'https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/technology/rss.xml',
    'https://cors-anywhere.herokuapp.com/https://www.theguardian.com/uk/technology/rss',
  ],
  pubDate: new Date(),
};

function App() {
  const [ loading, setLoading ] = useState();
  const [ result, setResult ] = useState();

  const onSubmit = () => {
    setLoading(true);
    RSSCombiner(feedConfig)
      .then((combinedFeed) => {
        const xml = combinedFeed.xml();
        const parser = xml2js.Parser();

        parser.parseString(xml, (err, result) => {
          console.log(result);
        });

        setResult(xml);
        setLoading(false);
      });
  }

  return (
    <div className="border-t-4 border-indigo-600">
      <div className="container max-w-6xl mx-auto px-6 lg:px-8">
        <div className="py-6 lg:py-8">
          <h1 className="text-white text-2xl"><span className="font-bold">RSS</span>Bundler</h1>
        </div>
        {
          loading ?
            <div>Loading</div>
          :
            <div className="flex -mx-4">
              <div className="w-1/2 px-4">
                <h3 className="text-gray-300 mb-3 font-medium text-xl">Input (One feed per line)</h3>
                <form onSubmit={onSubmit}>
                  <textarea className="bg-gray-300 rounded-lg shadow-xl p-6 mb-3 block w-full" rows="10" />
                  <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700">Create</button>
                </form>
              </div>
              <div className="w-1/2 px-4">
                <h3 className="text-gray-300 mb-3 font-medium text-xl">Result</h3>
                {
                  result ?
                    <div className="bg-gray-800 text-green-400 font-medium rounded-lg shadow-xl p-6">
                      {result}
                    </div>
                  :
                    <div className="bg-gray-800 text-green-400 font-medium rounded-lg shadow-xl p-6">
                      Nothing found.
                    </div>
                }
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
