const posts = [
  {
    attributes: {
      title: 'React Essentials in 5 minutes',
      content: `<p>React Essentials in 5 minutes</p>`,
      imgUrl: `https://shorturl.at/bisyL`,
      more_content: [
        {
          attributes: {
            title: 'React Essentails in 5 minutes',
            imgUrl: `https://shorturl.at/bisyL`,
            content: `<p>Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/>
              Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              </p><br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              </p>`,
          },
        },
        {
          attributes: {
            title: 'Components',
            content: `<p>Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/>
              Learn about some of the most important
              concepts of react to help you get started quickly.<br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              <br/> Knowledge of
              javascript is essential for some of the concepts explain here
              </p>`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 1',
            content: `<p>Sample content 1`,
          },
        },
      ],
      link: 'https://example.com/sample-news',
    },
  },
  {
    attributes: {
      title: 'Sample News Title 2',
      content: '<p>This is some sample content for the news item.</p>',
      more_content: [
        {
          attributes: {
            title: 'Sample subTitle 1',
            imgUrl: `https://shorturl.at/bisyL`,
            content: `<p>In this updated version, we've introduced a loading state. While loading is true, we display an ActivityIndicator to indicate loading. Once the measurement is done (loading becomes false), we render either the child container or the overflow message based on the value of isOverflowing. This ensures that loading is shown when the measurement is in progress and content is displayed once it's complete.In this example:
              <br/>
              We create two refs, childRef for the child container and parentRef for the parent container.
              Inside the useEffect hook, we measure the dimensions of both containers using the measure function.<br/>
              We then compare the dimensions of the child container (childWidth, childHeight) with those of the parent container (parentWidth, parentHeight).
              If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
              Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).
              loading is true, we display an ActivityIndicator to indicate loading. Once the measurement is done (loading becomes false), we render either the child container or the overflow message based on the value of isOverflowing. This ensures that loading is shown when the measurement is in progress and content is displayed once it's complete.In this example:
              <br/><br/></p><p>
              We create two refs, childRef for the child container and parentRef for the parent container.
              Inside the useEffect hook, we measure the dimensions of both containers using the measure function.
              We then compare the dimensions of the child container (childWidth, childHeight) with those of the parent container (parentWidth, parentHeight).
              If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
              Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).
              loading is true, we display an ActivityIndicator to indicate loading. Once the measurement is done (loading becomes false), we render either the child container or the overflow message based on the value of isOverflowing. This ensures that loading is shown when the measurement is in progress and content is displayed once it's complete.In this example:
              <br/><br/>
              We create two refs, childRef for the child container and parentRef for the parent container.
              Inside the useEffect hook, we measure the dimensions of both containers using the measure function.
              We then compare the dimensions of the child container (childWidth, childHeight) with those of the parent container (parentWidth, parentHeight).
              If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
              Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).
              <br/><br/>
              If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
              Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).<br/></p>`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 2',
            content: `
            <img
            width="50" height="50"
            style="object-fit: contain; align-self: center;"
            src="http://placeimg.com/1200/800/animals"
            />
            <h1>React native in 6 months</h1><p>We create two refs, childRef for the child container and parentRef for the parent container.
            Inside the useEffect hook, we measure the dimensions of both containers using the measure function.
            We then compare the dimensions of the child container (childWidth, childHeight) with those of the parent container (parentWidth, parentHeight).
            If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
            Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).
            <br/><br/>

            If the child's dimensions exceed the parent's dimensions in either width or height, isOverflowing is set to true, indicating overflow.
            Finally, we render a message if overflow is detected. This approach works for checking overflow in both directions (horizontal and vertical).</p>`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 2',
            content: `<p>Sample content 2`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 2',
            content: `<p>Sample content 2`,
          },
        },
      ],
      link: 'https://example.com/sample-news',
    },
  },
  {
    attributes: {
      title: 'Sample News Title 3',
      content: '<p>This is some sample content for the news item.</p>',
      more_content: [
        {
          attributes: {
            title: 'Sample subTitle 1',
            content: `<p>Sample content 1`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 2',
            content: `<p>Sample content 2`,
          },
        },
      ],
      link: 'https://example.com/sample-news',
    },
  },
  {
    attributes: {
      title: 'Sample News Title 3',
      content: '<p>This is some sample content for the news item.</p>',
      more_content: [
        {
          attributes: {
            title: 'Sample subTitle 1',
            content: `<p>Sample content 1`,
          },
        },
        {
          attributes: {
            title: 'Sample subTitle 2',
            content: `<p>Sample content 2`,
          },
        },
      ],
      link: 'https://example.com/sample-news',
    },
  },
];
export default posts;
