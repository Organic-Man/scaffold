import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import TagIcon from 'react-feather/dist/icons/tag';

import 'prismjs/themes/prism-okaidia.css';
import '../styles/variables';
import '../styles/global';

import Article from '@react-website-themes/default/components/Article';
import Branding from '@react-website-themes/default/components/Branding';
import Header from '@react-website-themes/default/components/Header';
import Heading from '@react-website-themes/default/components/Heading';
import Layout from '@react-website-themes/default/components/Layout';
import List from '@react-website-themes/default/components/List';
import Menu from '@react-website-themes/default/components/Menu';
import Seo from '@react-website-themes/default/components/Seo';

import config from 'content/meta/config';
import menuItems from 'content/meta/menu';

const PageTemplate = props => {
  const {
    pageContext: { category },
    data: {
      posts: { totalCount, edges }
    },
  } = props;

  const items = edges.map(edge => edge.node);

  const {
    headerTitle,
    headerSubTitle,
    siteUrl,
    siteDescription,
    siteLanguage,
    siteTitlePostfix,
  } = config;

  return (
    <Layout>
      <Header>
        <Branding title={headerTitle} subTitle={headerSubTitle} />
        <Menu items={menuItems} />
      </Header>
      <Article>
        <Heading>
          <span>Posts in category</span> <TagIcon />
          <h1>{category}</h1>
          <p className="meta">
            There {totalCount > 1 ? 'are' : 'is'} <strong>{totalCount}</strong>{' '}
            post
            {totalCount > 1 ? 's' : ''} in the category.
          </p>
        </Heading>
        <List items={items} />
      </Article>
      <Seo
        url={`${siteUrl}/categories/${category}/`}
        language={siteLanguage}
        title={`Posts in category: ${category}${siteTitlePostfix}`}
        description={siteDescription}
      />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query CategoryTemplateQuery($category: String!) {
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            categories
          }
        }
      }
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;