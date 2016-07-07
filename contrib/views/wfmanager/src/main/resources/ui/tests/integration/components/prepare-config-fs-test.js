import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('prepare-config-fs', 'Integration | Component | prepare config fs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{prepare-config-fs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#prepare-config-fs}}
      template block text
    {{/prepare-config-fs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
