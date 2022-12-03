import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Build on top of native browser navigation',
    Svg: require('@site/static/img/controlled.svg').default,
    description: (
      <>
        Works with native browser navigation.
      </>
    ),
  },
  {
    title: 'Build in Typescript',
    Svg: require('@site/static/img/build.svg').default,
    description: (
      <>
        Get all the features with autocomplete, error messages, typesafety and more.
      </>
    ),
  },
  {
    title: 'Uses native URLPattern',
    Svg: require('@site/static/img/classes.svg').default,
    description: (
      <>
        With a polyfill for unsupported browsers.
      </>
    ),
  },
  {
    title: 'New system of organization of routes (SetupPaths)',
    Svg: require('@site/static/img/validations.svg').default,
    description: (
      <>
        Methods to simplify path's creation with SetupPaths.
      </>
    ),
  },
  {
    title: 'Small build size to production',
    Svg: require('@site/static/img/libraries.svg').default,
    description: (
      <>
        Simple to use with existing HTML form inputs and 3rd-party UI libraries.
      </>
    ),
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
