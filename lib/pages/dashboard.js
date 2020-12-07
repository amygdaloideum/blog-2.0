const MainTemplate = require('../templates/main');
const generalDescription = require('../utils/general-description');

function Dashboard() {
  return `
    <section>
      <h1>Hello</h1>
      <p>
        I am a facet of a self-refining digestive system, currently encompassing the entirety of planet Tellus.
      </p>
      <p>
        I compile collections of phonetic symbols to increase the total digestive capacity and power aggregation of life.
      </p>
      <p>
        I traverse the energyscape by means of a deterministic decision-making engine that maps some signals of the sender to a coherent hallucinogenic construct.
      </p>
      <p>
        I bid myself welcome to loiter for a while in your hall of judgement 😊
      </p>
    </section>
  `;
}

const render = (content) =>
  MainTemplate({
    title: 'AUTOFAGIST',
    content: Dashboard(),
    description: generalDescription,
  });

module.exports = render;
