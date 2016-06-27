import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('workflow-actions', 'Integration | Component | workflow actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{workflow-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#workflow-actions}}
      template block text
    {{/workflow-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
