const HomePage = () => {
  return (
    <div>
      <h1>File uploads</h1>

      <form action="/upload" method="POST" encType="multipart/form-data">
        <input
          type="file"
          name="multiImages"
          accept="image/*"
          multiple
          required
        />
        <input type="submit" value="Upload" />
      </form>
      <br />
      {/* <img src="/static/uploads/myImage-1640608007631.jpg" alt="Backend" /> */}
    </div>
  );
};
export default HomePage;
