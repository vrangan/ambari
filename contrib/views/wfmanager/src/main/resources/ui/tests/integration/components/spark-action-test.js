import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('spark-action', 'Integration | Component | spark action', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{spark-action}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#spark-action}}
      template block text
    {{/spark-action}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
