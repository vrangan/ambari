import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('coord-job-details', 'Integration | Component | coord job details', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{coord-job-details}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#coord-job-details}}
      template block text
    {{/coord-job-details}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
