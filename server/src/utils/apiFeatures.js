class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'make', 'model', 'year'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // 1) Advanced filtering (gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        // 2) Vehicle-specific filtering (Advanced compatibility search)
        const vehicleFilter = {};
        if (this.queryString.make) vehicleFilter.make = this.queryString.make;
        if (this.queryString.model) vehicleFilter.model = this.queryString.model;
        if (this.queryString.year) {
            const searchYear = Number(this.queryString.year);
            vehicleFilter.yearStart = { $lte: searchYear };
            vehicleFilter.yearEnd = { $gte: searchYear };
        }

        if (Object.keys(vehicleFilter).length > 0) {
            this.query = this.query.find({
                compatibility: { $elemMatch: vehicleFilter }
            });
        }

        return this;
    }

    search() {
        if (this.queryString.search) {
            const searchRegex = { $regex: this.queryString.search, $options: 'i' };
            this.query = this.query.find({
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { sku: searchRegex }
                ]
            });
        }
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
