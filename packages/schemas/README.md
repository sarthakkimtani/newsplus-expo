# @newsplus/schemas

**Shared Zod validation schemas for News+**

This package provides type-safe validation schemas used across the News+ monorepo for consistent API data validation.

## Installation

This package is available as a workspace dependency:

```json
{
  "dependencies": {
    "@newsplus/schemas": "workspace:*"
  }
}
```

## Usage

```typescript
import {
  ArticleSchema,
  HeadlineSchema,
  EodDataSchema,
  StockProfileSchema,
} from "@newsplus/schemas";

// Validate and transform API response
const articles = HeadlineSchema.parse(apiResponse);
```
