import * as Handlebars from 'handlebars';

import { TestApp } from '../test-app';

describe(`Reflections:`, () => {
  let testApp: TestApp;
  let reflectionTemplate: Handlebars.TemplateDelegate;

  beforeAll(() => {
    testApp = new TestApp(['reflections.ts']);
  });

  describe(`(header)`, () => {
    beforeEach(() => {
      testApp.bootstrap({ hideBreadcrumbs: false, hideProjectName: false });
      TestApp.stubPartials(['index', 'comment', 'member.signature', 'members']);
      TestApp.stubHelpers(['breadcrumbs', 'hierarchy']);
      reflectionTemplate = TestApp.getTemplate('reflection');
    });
    test(`should compile template with breadcrumbs and project title`, () => {
      expect(
        TestApp.compileTemplate(reflectionTemplate, {
          model: testApp.findModule('reflections'),
          project: testApp.project,
        }),
      ).toMatchSnapshot();
    });
  });

  describe(`(template)`, () => {
    beforeEach(() => {
      testApp.bootstrap({ hideBreadcrumbs: true, hideProjectName: true });
      TestApp.stubPartials(['index', 'comment', 'member.signature', 'members']);
      TestApp.stubHelpers(['breadcrumbs', 'hierarchy']);
      reflectionTemplate = TestApp.getTemplate('reflection');
    });

    test(`should compile module with breadcrumbs and project title`, () => {
      expect(
        TestApp.compileTemplate(reflectionTemplate, {
          model: testApp.findModule('reflections'),
          project: testApp.project,
        }),
      ).toMatchSnapshot();
    });

    test(`should compile reflection with type params`, () => {
      expect(
        TestApp.compileTemplate(reflectionTemplate, {
          model: testApp.findReflection('ReflectionWithTypeParams'),
          project: testApp.project,
        }),
      ).toMatchSnapshot();
    });

    test(`should compile a callable reflection`, () => {
      expect(
        TestApp.compileTemplate(reflectionTemplate, {
          model: testApp.findReflection('CallableReflection'),
          project: testApp.project,
        }),
      ).toMatchSnapshot();
    });

    test(`should compile an indexable reflection`, () => {
      expect(
        TestApp.compileTemplate(reflectionTemplate, {
          model: testApp.findReflection('IndexableReflection'),
          project: testApp.project,
        }),
      ).toMatchSnapshot();
    });
  });
});
