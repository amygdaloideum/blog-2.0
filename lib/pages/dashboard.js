const MainTemplate = require('../templates/main');
const generalDescription = require('../utils/general-description');

function Dashboard() {
  return `
    <section>
      <h1>Discover it</h1>
      <p>
        Autofagist is a software producing human on Tellus. It loves to type on the
        keyboard to make Tellus a horrible place. It loves walking on the legs. It
        loves to flex and stretch with the legs and fingers.
      </p>
      <h1>Stalk it</h1>
      <a class="twitter-timeline" href="https://twitter.com/autofagist?ref_src=twsrc%5Etfw">Tweets by autofagist</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </section>
  `;
}

const render = content =>
  MainTemplate({
    title: 'AUTOFAGIST',
    content: Dashboard(),
    description: generalDescription,
  });

module.exports = render;
