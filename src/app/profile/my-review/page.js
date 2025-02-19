"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import {
  useAddToFavouriteMutation,
  useProviderAllReviewsQuery,
} from "@/redux/features/review/reviewApi";
import { Checkbox, Rate } from "antd";

export default function MyReview() {
  // Mock reviews. In a real app, fetch these from your backend or use RTK Query.
  const { data } = useProviderAllReviewsQuery();
  const allReviews = data?.data?.data;
  // console.log(data?.data?.data);

  const [addFav, { isLoading }] = useAddToFavouriteMutation();

  // const [reviews, setReviews] = useState([]);

  const handleFavouriteChange = async (reviewId, checked) => {
    try {
      console.log("Toggling review:", reviewId, "New status:", checked);

      const response = await addFav({
        reviewId: reviewId,
        isFavourite: checked,
      }).unwrap();
      console.log(response);

      SuccessSwal({
        title: "",
        text: response?.message,
      });
    } catch (error) {
      console.error(error);
      ErrorSwal({
        title: "",
        text: error?.data?.message || error?.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-4xl text-primary font-bold text-center mb-6">
        My Review
      </h1>
      <div className="flex justify-around items-center my-12">
        <div>1</div>
        <div>2</div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold "> All Reviews </h3>
        <p> Selected Reviews you want to preview </p>
        <div>
          {allReviews?.map((review) => (
            <div
              key={review._id}
              className="border rounded p-4 mb-4 flex items-start space-x-3"
            >
              <Checkbox
                checked={review?.isFavourite}
                onChange={(e) =>
                  handleFavouriteChange(review._id, e.target.checked)
                }
              />
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-bold">{review?.userId?.name}</span>
                  <Rate disabled defaultValue={review?.rating} />
                  <span className="text-gray-500 text-sm">
                    {review?.createdAt}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{review?.details}</p>
                <span className="text-blue-600 cursor-pointer">See More</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
