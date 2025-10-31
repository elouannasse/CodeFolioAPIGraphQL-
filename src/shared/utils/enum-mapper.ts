export function graphqlToMongoose(value: string): string {
  if (!value) return value;
  return value.replace(/_/g, "-");
}

export function mongooseToGraphql(value: string): string {
  if (!value) return value;
  return value.replace(/-/g, "_");
}

export function mapEmploymentType(
  type: string
): "full-time" | "part-time" | "contract" | "freelance" | "internship" {
  const mapped = graphqlToMongoose(type);

  const validTypes = [
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ];
  if (!validTypes.includes(mapped)) {
    throw new Error(`Invalid employment type: ${type}`);
  }

  return mapped as
    | "full-time"
    | "part-time"
    | "contract"
    | "freelance"
    | "internship";
}

export function mapCompetenceCategory(category: string): string {
  return graphqlToMongoose(category);
}

export function transformEnumsForMongoose<T extends Record<string, any>>(
  data: T,
  enumFields: string[]
): T {
  const transformed = { ...data } as any;

  enumFields.forEach((field) => {
    if (transformed[field]) {
      transformed[field] = graphqlToMongoose(transformed[field]);
    }
  });

  return transformed;
}

export function transformEnumsForGraphQL<T extends Record<string, any>>(
  data: T,
  enumFields: string[]
): T {
  const transformed = { ...data } as any;

  enumFields.forEach((field) => {
    if (transformed[field]) {
      transformed[field] = mongooseToGraphql(transformed[field]);
    }
  });

  return transformed;
}
