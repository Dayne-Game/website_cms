const Setting = require('../models/Setting');

// @desc Get all settings
// @route GET /api/v1/settings
// @access Public
const getSettings = async (req, res) => {
    const settings = await Setting.find({}).exec();

    if(!settings) return res.status(404).json({ message: 'No settings found' });

    const transformedObject = settings.reduce((result, item) => {
        result[item.name] = item.value;
        return result;
      }, {});

    res.status(200).json(transformedObject);
}

// @desc Create new Settings
// @route POST /api/v1/settings
// @access Private
const createNewSetting = async (req, res) => {
    const { name, value, description } = req.body;

    if(!name || !value || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const setting = await Setting.create({ name, value, description });

    if(setting) {
        res.status(201).json({ message: `${name} created` });
    } else {
        res.status(400).json({ message: 'Invalid setting data received' });
    }
}

// @desc Update Settings
// @route PUT /api/v1/settings/:id
// @access Private
const updateSetting = async (req, res) => {
    const { name, value, description } = req.body;

    if(!name || !value || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const setting = await Setting.findByIdAndUpdate(req.params.id, { name, value, description }, { new: true });

    if(setting) {
        res.status(200).json({ message: `${name} updated` });
    } else {
        res.status(400).json({ message: 'Invalid setting data received' });
    }
}

module.exports = { getSettings, createNewSetting, updateSetting }