'use strict';

/**
 * book-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-list.book-list');
