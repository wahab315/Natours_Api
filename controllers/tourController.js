const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  console.log("Body ", request.body);
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.error("Error writing file", err);
        response.status(500).send("Error writing file");
      } else {
        response.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      }
    }
  );
};

exports.getSingleTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  }
  res.status(200).json({ status: "success", data: tour });
};

exports.updateSingleTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  }
  const updatedTour = Object.assign(tour, req.body);
  tours[tours.indexOf(tour)] = updatedTour;
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.status(500).send("Error writing file");
      } else {
        res.status(200).json({
          status: "success",
          data: {
            tour: updatedTour,
          },
        });
      }
    }
  );
};

exports.deleteSingleTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "Tour not found" });
  }

  res.status(204).json({
    status: "success",
    data: null,
    message: "Tour deleted successfully",
  });
};
