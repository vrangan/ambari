import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sqoop-action', 'Integration | Component | sqoop action', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{sqoop-action}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#sqoop-action}}
      template block text
    {{/sqoop-action}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
