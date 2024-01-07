import React from "react";
import ContentProfileDetail from "./ContentProfileDetail";
import RecentPost from "./Post/RecentPost";
import PostProduk from "./Post/PostProduk";

export default function ChildProfileDetail() {
  return (
    <main>
      <section className="blog-slingle blog-area pt-130 pb-130 mt-130">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="right-item sub-bg">
                <ContentProfileDetail />
                <RecentPost />
              </div>
            </div>
            <PostProduk />
          </div>
        </div>
      </section>
    </main>
  );
}
