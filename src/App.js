import React, { useEffect, useState } from 'react';

const RSSCombiner = require('rss-combiner');
const xml2js = require('xml2js');

function App() {
  const [ loading, setLoading ] = useState();
  const [ result, setResult ] = useState();

  const onSubmit = (event) => {
    setLoading(true);

    var feedsValue = event.target.feeds.value.split('\n');
    console.log(feedsValue)

    const feedConfig = {
      size: 20,
      feeds: feedsValue,
      pubDate: new Date(),
    };

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
          <div className="text-white text-2xl flex items-center">
            <svg className="w-8 h-8 stroke-current mr-3" viewBox="0 0 40 40"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8.33333333 17.5C16.15666667 17.5 22.5 23.84333333 22.5 31.66666667M8.33333333 9.16666667c12.42666667 0 22.5 10.07333333 22.5 22.5M11.66666667 25.83c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z" stroke-width="1.66667"/><path d="M39.16666667 34.16666667c-.00833334 2.75833333-2.24166667 4.99166666-5 5H5.83333333c-2.75833333-.00833334-4.99166666-2.24166667-5-5V5.83333333c.00833334-2.75833333 2.24166667-4.99166666 5-5h28.33333334c2.75833333.00833334 4.99166666 2.24166667 5 5v28.33333334z" stroke-width="1.66667"/></g></svg>
            <span className="font-medium">RSS</span><span className="font-thin">Bundler</span>
          </div>
        </div>
        {
          loading ?
            <div>Loading</div>
          :
            <div className="flex -mx-4">
              <div className="w-1/2 px-4">
                <h3 className="text-gray-300 mb-3 font-medium text-xl">Input (One feed per line)</h3>
                <form onSubmit={onSubmit}>
                  <textarea name="feeds" className="bg-gray-300 rounded-lg shadow-xl p-6 mb-3 block w-full" rows="10" />
                  <button type="submit" className="inline-block px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700">Create</button>
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
