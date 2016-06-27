import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('target-node-selector', 'Integration | Component | target node selector', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{target-node-selector}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#target-node-selector}}
      template block text
    {{/target-node-selector}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
