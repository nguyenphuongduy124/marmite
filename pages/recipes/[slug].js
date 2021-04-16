import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "recipe",
  });
  const paths = res.items.map(item => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  if(!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { recipe: items[0] },
    revalidate: 1,
  };
}

export default function RecipeDetails({ recipe }) {
  console.log(recipe);
  if (!recipe) return <div>Loading...</div>;
  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${recipe.fields.featuredImage.fields.file.url}`}
          width={recipe.fields.featuredImage.fields.file.details.image.width}
          height={recipe.fields.featuredImage.fields.file.details.image.height}
        />
      </div>
      <div className="title">
        <h4>{recipe.fields.title}</h4>
      </div>
      <div className="time">
        <h2>Time cook:</h2>
        <p>This marmite need {recipe.fields.cookingTime} to cook</p>
      </div>
      <div className="ingredients">
        <ul>
          {recipe.fields.ingredients.map(ing => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </div>
      <div className="method">
        {documentToReactComponents(recipe.fields.method)}
      </div>
    </div>
  );
}
